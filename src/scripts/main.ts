import { initI18n } from './i18n';
import { initPlanQuiz } from './quiz';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initI18n();
initHeader();
initHeroCarousel();
initProgramFilters();
initProgramDialogs();
initPlanQuiz();
initFaqAccordion();
initStickyFaq();
initReveal();
initCounters();

function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-mobile-link]');

  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    header.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
  };

  toggle?.addEventListener('click', () => {
    const isOpen = header.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach((link) => link.addEventListener('click', closeMenu));

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

function initHeroCarousel() {
  const root = document.querySelector<HTMLElement>('[data-hero]');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-slide]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-hero-dot]'));
  if (slides.length <= 1) return;

  let activeIndex = 0;
  let timeoutId: number | undefined;
  const intervalMs = 5000;

  const stop = () => {
    window.clearTimeout(timeoutId);
  };

  const goTo = (nextIndex: number) => {
    activeIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === activeIndex);
    });

    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  };

  const scheduleNext = () => {
    stop();
    if (prefersReducedMotion || document.hidden) return;

    timeoutId = window.setTimeout(() => {
      goTo(activeIndex + 1);
      scheduleNext();
    }, intervalMs);
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.slideIndex || 0);
      goTo(index);
      scheduleNext();
    });
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      scheduleNext();
    }
  });

  scheduleNext();
}

function initProgramFilters() {
  const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-program-card]'));
  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';

      filterButtons.forEach((candidate) => {
        const isActive = candidate === button;
        candidate.classList.toggle('is-active', isActive);
        candidate.setAttribute('aria-pressed', String(isActive));
      });

      cards.forEach((card) => {
        const shouldShow = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });
}

function initProgramDialogs() {
  const openButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-open-dialog]'));
  const dialogs = Array.from(document.querySelectorAll<HTMLDialogElement>('[data-program-dialog]'));

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const dialog = document.getElementById(button.dataset.openDialog || '') as HTMLDialogElement | null;
      dialog?.showModal();
    });
  });

  dialogs.forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });

    dialog.querySelectorAll<HTMLElement>('[data-close-dialog]').forEach((button) => {
      button.addEventListener('click', () => dialog.close());
    });
  });
}

function initFaqAccordion() {
  const items = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-faq-item]'));
  if (!items.length) return;

  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;

      items.forEach((candidate) => {
        if (candidate !== item) candidate.open = false;
      });
    });

    item.querySelector<HTMLElement>('[data-faq-answer]')?.addEventListener('click', () => {
      window.setTimeout(() => {
        item.open = false;
      }, 0);
    });
  });
}

function initStickyFaq() {
  const section = document.querySelector<HTMLElement>('.faq-section');
  const heading = document.querySelector<HTMLElement>('.faq-heading');
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!section || !heading) return;

  const updatePosition = () => {
    if (window.matchMedia('(max-width: 860px)').matches) {
      section.style.removeProperty('--faq-heading-top');
      return;
    }

    const headerHeight = header?.offsetHeight ?? 84;
    const headingHeight = heading.offsetHeight;
    const freeSpace = window.innerHeight - headerHeight;
    const top = headerHeight + Math.max(28, Math.round((freeSpace - headingHeight) / 2));
    section.style.setProperty('--faq-heading-top', `${top}px`);
  };

  updatePosition();
  window.addEventListener('resize', updatePosition, { passive: true });
}

function initReveal() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!items.length) return;

  items.forEach((item) => item.classList.add('reveal'));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.14 }
  );

  items.forEach((item) => observer.observe(item));
}

function initCounters() {
  const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count-to]'));
  if (!counters.length) return;

  const setFinalValue = (counter: HTMLElement) => {
    counter.textContent = counter.dataset.countTo || '0';
  };

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    counters.forEach(setFinalValue);
    return;
  }

  const animateCounter = (counter: HTMLElement) => {
    const target = Number(counter.dataset.countTo || 0);
    const duration = 900;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}
