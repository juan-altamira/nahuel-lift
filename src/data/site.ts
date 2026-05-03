export type HeroSlide = {
  id: string;
  alt: string;
  desktop: {
    avif: string;
    webp: string;
  };
  mobile: {
    avif: string;
    webp: string;
  };
  position: string;
};

export type ProgramCategory = 'all' | 'hybrid' | 'running' | 'hypertrophy';

export type Program = {
  slug: string;
  title: string;
  category: Exclude<ProgramCategory, 'all'>;
  categoryLabel: string;
  description: string;
  audience: string;
  image: {
    avif: string;
    webp: string;
  };
  featured?: boolean;
  badge?: string;
  duration: string;
  level: string;
  goal: string;
  requirements: string;
  delivery: string;
  price: string;
  includes: string[];
  faq: {
    question: string;
    answer: string;
  }[];
};

export const whatsappPhone = '5492923438949';

export const mentorshipWhatsAppHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
  'Hola! Estoy interesado en la Mentoria 1 a 1'
)}`;

export const navItems = [
  { label: 'Programas', href: '#selector-programas' },
  { label: 'Mentoría', href: '#mentoria' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Preguntas frecuentes', href: '#preguntas' }
];

export const heroSlides: HeroSlide[] = [
  {
    id: 'mountain-team',
    alt: 'Grupo descansando en una montaña nevada al amanecer',
    desktop: {
      avif: '/assets/images/hero-slider-1-desktop.avif',
      webp: '/assets/images/hero-slider-1-desktop.webp'
    },
    mobile: {
      avif: '/assets/images/hero-slider-1-mobile.avif',
      webp: '/assets/images/hero-slider-1-mobile.webp'
    },
    position: '70% 50%'
  },
  {
    id: 'beach-handstand',
    alt: 'Atleta haciendo vertical en la playa',
    desktop: {
      avif: '/assets/images/hero-slider-2-desktop.avif',
      webp: '/assets/images/hero-slider-2-desktop.webp'
    },
    mobile: {
      avif: '/assets/images/hero-slider-2-mobile.avif',
      webp: '/assets/images/hero-slider-2-mobile.webp'
    },
    position: '50% 58%'
  },
  {
    id: 'rock-climb',
    alt: 'Atleta escalando una pared de roca',
    desktop: {
      avif: '/assets/images/hero-slider-3-desktop.avif',
      webp: '/assets/images/hero-slider-3-desktop.webp'
    },
    mobile: {
      avif: '/assets/images/hero-slider-3-mobile.avif',
      webp: '/assets/images/hero-slider-3-mobile.webp'
    },
    position: '47% 64%'
  }
];

export const stats = [
  { value: 8, suffix: '+', label: 'Años' },
  { value: 500, suffix: '+', label: 'Atletas' },
  { value: 3, suffix: '', label: 'Planes' }
];

export const benefits = [
  {
    icon: 'layout',
    title: 'Estructurado',
    text: 'Cada semana planificada. Sin improvisar.'
  },
  {
    icon: 'shield',
    title: 'Probado',
    text: 'Método aplicado con cientos de atletas.'
  },
  {
    icon: 'zap',
    title: 'Acceso digital',
    text: 'Coordinás por WhatsApp y recibís el plan para empezar.'
  },
  {
    icon: 'trending',
    title: 'Resultados',
    text: 'Fuerza, resistencia y físico bajo un mismo enfoque.'
  }
];

export const filters: { id: ProgramCategory; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'hybrid', label: 'Híbrido' },
  { id: 'running', label: 'Resistencia' },
  { id: 'hypertrophy', label: 'Hipertrofia' }
];

export const programs: Program[] = [
  {
    slug: 'plan-hibrido',
    title: 'Plan Híbrido',
    category: 'hybrid',
    categoryLabel: 'Híbrido',
    description: 'Fuerza, resistencia y variedad para construir un físico atlético y completo.',
    audience: 'Para quienes quieren verse mejor y rendir mejor sin enfocarse en una sola cosa.',
    image: {
      avif: '/assets/images/card-hybrid-pack.avif',
      webp: '/assets/images/card-hybrid-pack.webp'
    },
    featured: true,
    duration: '12 semanas',
    level: 'Adaptable',
    goal: 'Combinar fuerza y resistencia con una progresión equilibrada.',
    requirements: 'Gimnasio básico y disponibilidad para entrenar fuerza y resistencia durante la semana.',
    delivery: 'Acceso digital al plan después de coordinar la compra por WhatsApp.',
    price: 'Pago único',
    includes: [
      'Distribución semanal de fuerza y resistencia',
      'Progresión clara para sostener el rendimiento',
      'Indicaciones simples para ajustar intensidad y recuperación'
    ],
    faq: [
      {
        question: '¿Es solo para gente avanzada?',
        answer: 'No. Se puede ajustar al punto de partida siempre que puedas entrenar con constancia.'
      },
      {
        question: '¿Sirve si quiero mejorar físico y rendimiento?',
        answer: 'Sí. Es el plan pensado justamente para combinar estética, fuerza y capacidad física.'
      }
    ]
  },
  {
    slug: 'plan-resistencia-velocidad',
    title: 'Plan Resistencia / Velocidad',
    category: 'running',
    categoryLabel: 'Resistencia',
    description: 'Para cansarte menos, correr mejor, mejorar ritmo y ganar capacidad física.',
    audience: 'Para quienes quieren rendir más, moverse mejor y sentirse con más aire.',
    image: {
      avif: '/assets/images/card-10k-intermedio.avif',
      webp: '/assets/images/card-10k-intermedio.webp'
    },
    duration: '12 semanas',
    level: 'Adaptable',
    goal: 'Mejorar resistencia, velocidad, ritmo y tolerancia al esfuerzo.',
    requirements: 'Poder caminar, trotar o correr según tu nivel actual.',
    delivery: 'Acceso digital al plan después de coordinar la compra por WhatsApp.',
    price: 'Pago único',
    includes: [
      'Sesiones progresivas de resistencia',
      'Trabajos para mejorar ritmo y velocidad',
      'Control simple de intensidad y recuperación'
    ],
    faq: [
      {
        question: '¿Sirve si no corro rápido?',
        answer: 'Sí. El objetivo es mejorar desde tu punto actual, no arrancar desde un nivel avanzado.'
      },
      {
        question: '¿También mejora mi condición general?',
        answer: 'Sí. Está pensado para que rindas más, te canses menos y puedas sostener mejor los esfuerzos.'
      }
    ]
  },
  {
    slug: 'plan-fuerza-hipertrofia',
    title: 'Plan Fuerza / Hipertrofia',
    category: 'hypertrophy',
    categoryLabel: 'Hipertrofia',
    description: 'Para ganar músculo, mejorar fuerza y construir un físico más sólido.',
    audience: 'Para quienes priorizan verse más fuertes y progresar con estructura de gimnasio.',
    image: {
      avif: '/assets/images/card-hypertrophy.avif',
      webp: '/assets/images/card-hypertrophy.webp'
    },
    duration: '12 semanas',
    level: 'Adaptable',
    goal: 'Ganar fuerza y masa muscular con una progresión clara.',
    requirements: 'Acceso a gimnasio y compromiso para seguir una rutina estructurada.',
    delivery: 'Acceso digital al plan después de coordinar la compra por WhatsApp.',
    price: 'Pago único',
    includes: [
      'Rutina de fuerza e hipertrofia',
      'Progresión de cargas y volumen',
      'Indicaciones para ejecutar y ajustar cada semana'
    ],
    faq: [
      {
        question: '¿Es solo para ganar músculo?',
        answer: 'No. El foco principal es músculo y fuerza, pero con una estructura que también mejora tu rendimiento en el gimnasio.'
      },
      {
        question: '¿Necesito mucha experiencia?',
        answer: 'No hace falta ser avanzado, pero sí tener acceso a gimnasio y ganas de seguir una progresión.'
      }
    ]
  }
];

export const faqs = [
  {
    question: '¿Necesito experiencia para empezar?',
    answer:
      'No necesariamente. La recomendación depende de tu objetivo y de tu punto de partida.'
  },
  {
    question: '¿Cuándo recibo el plan?',
    answer: 'Después de coordinar la compra por WhatsApp, recibís el acceso digital para empezar.'
  },
  {
    question: '¿Cómo sé qué plan me conviene?',
    answer: 'Podés hacer el test “Encontrá tu plan”. Te recomienda una opción según tus respuestas.'
  },
  {
    question: '¿Puedo hacerlo si entreno en gimnasio?',
    answer:
      'Sí. Los planes de fuerza e híbrido contemplan trabajo de gimnasio con estructura.'
  },
  {
    question: '¿Qué pasa si no sé qué plan elegir?',
    answer:
      'Podés hacer el test “Encontrá tu plan”. Te va a recomendar una opción según tu objetivo, preferencias y prioridades de entrenamiento.',
    ctaLabel: 'Hacer el test',
    ctaHref: '#encontra-tu-plan'
  },
  {
    question: '¿Incluye nutrición?',
    answer:
      'Los planes se enfocan en entrenamiento. La adaptación completa de nutrición, hábitos y seguimiento corresponde a la mentoría 1:1.'
  },
  {
    question: '¿La mentoría es para cualquiera?',
    answer: 'No. Es para personas comprometidas que quieren seguimiento real y están dispuestas a trabajar en serio.'
  }
];

export const imageCredits = [
  { label: 'Alfredo Pasta / Pexels', href: 'https://www.pexels.com/photo/muscular-male-runner-in-outdoor-setting-31992027/' },
  { label: 'Camilo.raw / Pexels', href: 'https://www.pexels.com/photo/shirtless-man-running-on-the-track-13940068/' },
  { label: 'god picture / Pexels', href: 'https://www.pexels.com/photo/man-running-on-stairs-22745626/' },
  { label: 'Sergey Ochkanov / Pexels', href: 'https://www.pexels.com/photo/photo-of-a-man-exercising-on-an-outdoor-gym-10086629/' },
  { label: 'Tanja Nikolic / Pexels', href: 'https://www.pexels.com/photo/man-lifting-barbell-at-gym-15596429/' }
];
