import type { APIRoute } from 'astro';
import { get, put } from '@vercel/blob';
import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  createEmptyAnalyticsSummary,
  mergeAnalyticsEvents,
  normalizeStoredAnalyticsSummary,
  parseAnalyticsDrainPayload,
  parseDashboardPeriod,
  toDashboardSummary,
  type StoredAnalyticsSummary
} from '@/lib/analytics-summary';

export const prerender = false;

const BLOB_PATH = 'analytics/summary.json';

type StoredWithMeta = {
  summary: StoredAnalyticsSummary;
  etag: string | null;
};

const globalStore = globalThis as typeof globalThis & {
  __nahuelAnalyticsSummary?: StoredAnalyticsSummary;
};

export const GET: APIRoute = async ({ request, url }) => {
  if (!isDashboardRequestAllowed(request, url)) {
    return json(
      {
        code: 'unauthorized',
        error: 'Dashboard token requerido'
      },
      401
    );
  }

  const period = parseDashboardPeriod(url.searchParams.get('period'));
  const { summary } = await readStoredSummary();
  const dashboard = toDashboardSummary(summary, period);

  return json(
    {
      ...dashboard,
      storage: {
        configured: hasBlobToken(),
        provider: hasBlobToken() ? 'vercel-blob' : import.meta.env.DEV ? 'memory' : 'missing'
      }
    },
    200
  );
};

export const POST: APIRoute = async ({ request }) => {
  const drainSecret = getDrainSecret();

  if (import.meta.env.PROD && !drainSecret) {
    return json(
      {
        code: 'missing_signature_secret',
        error: 'Falta VERCEL_DRAIN_SECRET'
      },
      503
    );
  }

  if (import.meta.env.PROD && !hasBlobToken()) {
    return json(
      {
        code: 'missing_blob_token',
        error: 'Falta BLOB_READ_WRITE_TOKEN'
      },
      503
    );
  }

  const rawBody = await request.text();

  if (drainSecret && !isValidVercelSignature(rawBody, request.headers.get('x-vercel-signature'), drainSecret)) {
    return json(
      {
        code: 'invalid_signature',
        error: "signature didn't match"
      },
      403
    );
  }

  let events;

  try {
    events = parseAnalyticsDrainPayload(rawBody);
  } catch {
    return json(
      {
        code: 'invalid_payload',
        error: 'El payload no es JSON o NDJSON valido'
      },
      400
    );
  }

  if (events.length === 0) {
    return json({ ok: true, accepted: 0 }, 202);
  }

  const summary = await mergeAndPersist(events);

  return json(
    {
      ok: true,
      accepted: events.length,
      updatedAt: summary.updatedAt
    },
    200
  );
};

async function mergeAndPersist(events: Parameters<typeof mergeAnalyticsEvents>[1]): Promise<StoredAnalyticsSummary> {
  if (!hasBlobToken()) {
    const current = globalStore.__nahuelAnalyticsSummary ?? createEmptyAnalyticsSummary();
    const next = mergeAnalyticsEvents(current, events);
    globalStore.__nahuelAnalyticsSummary = next;
    return next;
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { summary, etag } = await readStoredSummary();
    const next = mergeAnalyticsEvents(summary, events);

    try {
      await put(BLOB_PATH, JSON.stringify(next), {
        access: 'private',
        allowOverwrite: true,
        contentType: 'application/json',
        cacheControlMaxAge: 60,
        ...(etag ? { ifMatch: etag } : {})
      });

      return next;
    } catch (error) {
      if (attempt === 2 || !isPreconditionError(error)) {
        throw error;
      }
    }
  }

  throw new Error('No se pudo actualizar el resumen de analytics');
}

async function readStoredSummary(): Promise<StoredWithMeta> {
  if (!hasBlobToken()) {
    return {
      summary: globalStore.__nahuelAnalyticsSummary ?? createEmptyAnalyticsSummary(),
      etag: null
    };
  }

  const blob = await get(BLOB_PATH, {
    access: 'private',
    useCache: false
  });

  if (!blob?.stream) {
    return {
      summary: createEmptyAnalyticsSummary(),
      etag: null
    };
  }

  const rawSummary = await new Response(blob.stream).text();

  return {
    summary: normalizeStoredAnalyticsSummary(JSON.parse(rawSummary)),
    etag: blob.blob.etag
  };
}

function isDashboardRequestAllowed(request: Request, url: URL): boolean {
  const dashboardToken = process.env.ANALYTICS_DASHBOARD_TOKEN;

  if (!dashboardToken) {
    return true;
  }

  return request.headers.get('x-dashboard-token') === dashboardToken || url.searchParams.get('key') === dashboardToken;
}

function getDrainSecret(): string | undefined {
  return process.env.VERCEL_DRAIN_SECRET ?? process.env.VERCEL_ANALYTICS_DRAIN_SECRET;
}

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isValidVercelSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) {
    return false;
  }

  const expectedSignature = createHmac('sha1', secret).update(Buffer.from(rawBody, 'utf-8')).digest('hex');
  const expected = Buffer.from(expectedSignature, 'hex');
  const actual = Buffer.from(header, 'hex');

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function isPreconditionError(error: unknown): boolean {
  return error instanceof Error && error.name === 'BlobPreconditionFailedError';
}

function json(body: unknown, status: number): Response {
  return Response.json(body, {
    status,
    headers: {
      'cache-control': 'no-store'
    }
  });
}
