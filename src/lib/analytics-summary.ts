export type VercelAnalyticsEvent = {
  schema?: string;
  eventType?: string;
  eventName?: string;
  timestamp?: number | string;
  sessionId?: number | string;
  deviceId?: number | string;
  origin?: string;
  path?: string;
  route?: string;
  referrer?: string;
  country?: string;
  region?: string;
  city?: string;
  deviceType?: string;
  clientName?: string;
  vercelEnvironment?: string;
};

type CountMap = Record<string, number>;

type CountrySummary = {
  visits: number;
  visitors: string[];
};

type DaySummary = {
  date: string;
  pageviews: number;
  customEvents: number;
  sessions: string[];
  visitors: string[];
  countries: Record<string, CountrySummary>;
  cities: CountMap;
  paths: CountMap;
  referrers: CountMap;
  devices: CountMap;
  browsers: CountMap;
};

export type StoredAnalyticsSummary = {
  version: 1;
  createdAt: string;
  updatedAt: string | null;
  acceptedEvents: number;
  days: Record<string, DaySummary>;
  lastEvents: Array<{
    at: string;
    type: string;
    path: string;
    country: string;
  }>;
};

export type DashboardPeriod = 7 | 30 | 90 | 'all';

export type DashboardSummary = {
  generatedAt: string;
  updatedAt: string | null;
  period: DashboardPeriod;
  totals: {
    visits: number;
    visitors: number;
    sessions: number;
    customEvents: number;
  };
  countries: Array<{
    code: string;
    name: string;
    visits: number;
    visitors: number;
    share: number;
  }>;
  cities: Array<{
    label: string;
    visits: number;
    share: number;
  }>;
  paths: Array<{
    path: string;
    visits: number;
    share: number;
  }>;
  trend: Array<{
    date: string;
    visits: number;
    visitors: number;
  }>;
  source: {
    hasData: boolean;
    acceptedEvents: number;
  };
};

const TIME_ZONE = 'America/Argentina/Buenos_Aires';
const COUNTRY_FALLBACK = 'ZZ';
const UNSET_LABEL = 'Sin dato';

const regionNames = new Intl.DisplayNames(['es'], { type: 'region' });

export function createEmptyAnalyticsSummary(): StoredAnalyticsSummary {
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    acceptedEvents: 0,
    days: {},
    lastEvents: []
  };
}

export function normalizeStoredAnalyticsSummary(value: unknown): StoredAnalyticsSummary {
  if (!isRecord(value)) {
    return createEmptyAnalyticsSummary();
  }

  return {
    version: 1,
    createdAt: typeof value.createdAt === 'string' ? value.createdAt : new Date().toISOString(),
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : null,
    acceptedEvents: typeof value.acceptedEvents === 'number' ? value.acceptedEvents : 0,
    days: normalizeDays(value.days),
    lastEvents: Array.isArray(value.lastEvents)
      ? value.lastEvents.filter(isRecord).slice(0, 24).map((event) => ({
          at: typeof event.at === 'string' ? event.at : new Date().toISOString(),
          type: typeof event.type === 'string' ? event.type : 'pageview',
          path: typeof event.path === 'string' ? event.path : '/',
          country: typeof event.country === 'string' ? event.country : COUNTRY_FALLBACK
        }))
      : []
  };
}

export function parseAnalyticsDrainPayload(rawBody: string): VercelAnalyticsEvent[] {
  const trimmed = rawBody.trim();

  if (!trimmed) {
    return [];
  }

  if (trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed.filter(isAnalyticsEvent) : [];
  }

  return trimmed
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line))
    .filter(isAnalyticsEvent);
}

export function mergeAnalyticsEvents(
  currentSummary: StoredAnalyticsSummary,
  incomingEvents: VercelAnalyticsEvent[]
): StoredAnalyticsSummary {
  const summary = normalizeStoredAnalyticsSummary(currentSummary);
  let acceptedEvents = 0;

  for (const event of incomingEvents) {
    if (event.schema !== 'vercel.analytics.v1') {
      continue;
    }

    acceptedEvents += 1;
    const timestamp = getEventDate(event.timestamp);
    const dateKey = formatDateKey(timestamp);
    const day = (summary.days[dateKey] ??= createDaySummary(dateKey));
    const type = event.eventType === 'event' ? 'event' : 'pageview';
    const path = normalizePath(event.path ?? event.route);
    const country = normalizeCountry(event.country);
    const visitorKey = normalizeId(event.deviceId);
    const sessionKey = normalizeId(event.sessionId);

    if (type === 'pageview') {
      day.pageviews += 1;
      increment(day.paths, path);
      increment(day.countries[country] ??= { visits: 0, visitors: [] }, 'visits');
      increment(day.cities, formatCity(event.city, country));
      increment(day.referrers, normalizeReferrer(event.referrer));
      increment(day.devices, normalizeLabel(event.deviceType));
      increment(day.browsers, normalizeLabel(event.clientName));

      if (visitorKey) {
        addUnique(day.visitors, visitorKey);
        addUnique(day.countries[country].visitors, visitorKey);
      }

      if (sessionKey) {
        addUnique(day.sessions, sessionKey);
      }
    } else {
      day.customEvents += 1;
    }

    summary.lastEvents.unshift({
      at: timestamp.toISOString(),
      type,
      path,
      country
    });
  }

  if (acceptedEvents > 0) {
    summary.updatedAt = new Date().toISOString();
    summary.acceptedEvents += acceptedEvents;
    summary.lastEvents = summary.lastEvents.slice(0, 24);
  }

  return summary;
}

export function toDashboardSummary(
  storedSummary: StoredAnalyticsSummary,
  period: DashboardPeriod
): DashboardSummary {
  const summary = normalizeStoredAnalyticsSummary(storedSummary);
  const selectedDays = selectDays(summary, period);
  const countryCounts = new Map<string, { visits: number; visitors: number }>();
  const cityCounts = new Map<string, number>();
  const pathCounts = new Map<string, number>();
  const totals = {
    visits: 0,
    visitors: 0,
    sessions: 0,
    customEvents: 0
  };

  for (const day of selectedDays) {
    totals.visits += day.pageviews;
    totals.visitors += day.visitors.length;
    totals.sessions += day.sessions.length;
    totals.customEvents += day.customEvents;

    for (const [country, countrySummary] of Object.entries(day.countries)) {
      const current = countryCounts.get(country) ?? { visits: 0, visitors: 0 };
      current.visits += countrySummary.visits;
      current.visitors += countrySummary.visitors.length;
      countryCounts.set(country, current);
    }

    addCounts(cityCounts, day.cities);
    addCounts(pathCounts, day.paths);
  }

  const trendDays = selectDays(summary, period === 'all' ? 30 : period);

  return {
    generatedAt: new Date().toISOString(),
    updatedAt: summary.updatedAt,
    period,
    totals,
    countries: Array.from(countryCounts.entries())
      .map(([code, value]) => ({
        code,
        name: countryName(code),
        visits: value.visits,
        visitors: value.visitors,
        share: share(value.visits, totals.visits)
      }))
      .sort(sortByVisits)
      .slice(0, 8),
    cities: mapTopEntries(cityCounts, totals.visits, 8).map(({ key, visits, share }) => ({
      label: key,
      visits,
      share
    })),
    paths: mapTopEntries(pathCounts, totals.visits, 6).map(({ key, visits, share }) => ({
      path: key,
      visits,
      share
    })),
    trend: trendDays.map((day) => ({
      date: day.date,
      visits: day.pageviews,
      visitors: day.visitors.length
    })),
    source: {
      hasData: totals.visits > 0 || totals.customEvents > 0,
      acceptedEvents: summary.acceptedEvents
    }
  };
}

export function parseDashboardPeriod(value: string | null): DashboardPeriod {
  if (value === '7') {
    return 7;
  }

  if (value === '90') {
    return 90;
  }

  if (value === 'all') {
    return 'all';
  }

  return 30;
}

function createDaySummary(date: string): DaySummary {
  return {
    date,
    pageviews: 0,
    customEvents: 0,
    sessions: [],
    visitors: [],
    countries: {},
    cities: {},
    paths: {},
    referrers: {},
    devices: {},
    browsers: {}
  };
}

function normalizeDays(days: unknown): Record<string, DaySummary> {
  if (!isRecord(days)) {
    return {};
  }

  return Object.entries(days).reduce<Record<string, DaySummary>>((normalized, [date, value]) => {
    if (!isRecord(value)) {
      return normalized;
    }

    const day = createDaySummary(date);
    day.pageviews = typeof value.pageviews === 'number' ? value.pageviews : 0;
    day.customEvents = typeof value.customEvents === 'number' ? value.customEvents : 0;
    day.sessions = normalizeStringArray(value.sessions);
    day.visitors = normalizeStringArray(value.visitors);
    day.countries = normalizeCountries(value.countries);
    day.cities = normalizeCountMap(value.cities);
    day.paths = normalizeCountMap(value.paths);
    day.referrers = normalizeCountMap(value.referrers);
    day.devices = normalizeCountMap(value.devices);
    day.browsers = normalizeCountMap(value.browsers);
    normalized[date] = day;
    return normalized;
  }, {});
}

function normalizeCountries(countries: unknown): Record<string, CountrySummary> {
  if (!isRecord(countries)) {
    return {};
  }

  return Object.entries(countries).reduce<Record<string, CountrySummary>>((normalized, [country, value]) => {
    if (!isRecord(value)) {
      return normalized;
    }

    normalized[normalizeCountry(country)] = {
      visits: typeof value.visits === 'number' ? value.visits : 0,
      visitors: normalizeStringArray(value.visitors)
    };
    return normalized;
  }, {});
}

function normalizeCountMap(value: unknown): CountMap {
  if (!isRecord(value)) {
    return {};
  }

  return Object.entries(value).reduce<CountMap>((counts, [key, count]) => {
    if (typeof count === 'number' && Number.isFinite(count)) {
      counts[key] = count;
    }

    return counts;
  }, {});
}

function selectDays(summary: StoredAnalyticsSummary, period: DashboardPeriod): DaySummary[] {
  const orderedDays = Object.values(summary.days).sort((a, b) => a.date.localeCompare(b.date));

  if (period === 'all') {
    return orderedDays;
  }

  const dates = new Set(lastDateKeys(period));
  return orderedDays.filter((day) => dates.has(day.date));
}

function lastDateKeys(days: number): string[] {
  const date = new Date();
  const keys: string[] = [];

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() - offset);
    keys.push(formatDateKey(copy));
  }

  return keys;
}

function formatDateKey(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);

  const year = parts.find((part) => part.type === 'year')?.value ?? '1970';
  const month = parts.find((part) => part.type === 'month')?.value ?? '01';
  const day = parts.find((part) => part.type === 'day')?.value ?? '01';

  return `${year}-${month}-${day}`;
}

function getEventDate(timestamp: VercelAnalyticsEvent['timestamp']): Date {
  const date = new Date(timestamp ?? Date.now());
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function normalizePath(value: unknown): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return '/';
  }

  return value.startsWith('/') ? value : `/${value}`;
}

function normalizeCountry(value: unknown): string {
  if (typeof value !== 'string') {
    return COUNTRY_FALLBACK;
  }

  const code = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : COUNTRY_FALLBACK;
}

function normalizeId(value: unknown): string | null {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return null;
  }

  const id = String(value).trim();
  return id.length > 0 ? id : null;
}

function normalizeLabel(value: unknown): string {
  if (typeof value !== 'string') {
    return UNSET_LABEL;
  }

  const label = value.trim();
  return label.length > 0 ? label : UNSET_LABEL;
}

function normalizeReferrer(value: unknown): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return 'Directo';
  }

  try {
    return new URL(value).hostname.replace(/^www\./, '');
  } catch {
    return value;
  }
}

function formatCity(city: unknown, country: string): string {
  const label = normalizeLabel(city);
  return label === UNSET_LABEL ? countryName(country) : `${label}, ${country}`;
}

function countryName(code: string): string {
  if (code === COUNTRY_FALLBACK) {
    return 'Sin pais';
  }

  return regionNames.of(code) ?? code;
}

function addUnique(list: string[], value: string): void {
  if (!list.includes(value)) {
    list.push(value);
  }
}

function increment(target: CountMap, key: string): void;
function increment(target: CountrySummary, key: 'visits'): void;
function increment(target: CountMap | CountrySummary, key: string): void {
  target[key as keyof typeof target] = ((target[key as keyof typeof target] as number | undefined) ?? 0) + 1;
}

function addCounts(target: Map<string, number>, source: CountMap): void {
  for (const [key, value] of Object.entries(source)) {
    target.set(key, (target.get(key) ?? 0) + value);
  }
}

function mapTopEntries(counts: Map<string, number>, total: number, limit: number): Array<{
  key: string;
  visits: number;
  share: number;
}> {
  return Array.from(counts.entries())
    .map(([key, visits]) => ({
      key,
      visits,
      share: share(visits, total)
    }))
    .sort(sortByVisits)
    .slice(0, limit);
}

function share(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 1000) / 10 : 0;
}

function sortByVisits<T extends { visits: number }>(a: T, b: T): number {
  return b.visits - a.visits;
}

function normalizeStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function isAnalyticsEvent(value: unknown): value is VercelAnalyticsEvent {
  return isRecord(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
