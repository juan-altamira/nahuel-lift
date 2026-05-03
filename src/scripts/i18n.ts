type Language = 'es' | 'en';

type Binding = {
  node: Text;
  key: string;
  leading: string;
  trailing: string;
};

const storageKey = 'nahuel-lifts-language';

const en: Record<string, string> = {
  'Programas': 'Programs',
  'Mentoría': 'Mentorship',
  'Sobre mí': 'About me',
  'Preguntas frecuentes': 'FAQ',
  'Ver planes': 'View plans',
  '¿No sabés cuál elegir? Encontrá tu plan': 'Not sure which one to choose? Find your plan',
  '+500 atletas ya entrenan con estos programas': '+500 athletes already train with these plans',
  'Programas que': 'Plans that',
  'realmente funcionan': 'actually work',
  'Entrená con planes probados, progresivos y claros desde el primer día. Sin improvisar. Sin perder tiempo.':
    'Train with proven, progressive and clear plans from day one. No guessing. No wasted time.',
  'Mentoría 1:1': '1:1 Mentorship',
  'Acceso digital': 'Digital access',
  'Pago único': 'One-time payment',
  'Plan estructurado': 'Structured plan',
  'Años': 'Years',
  'Atletas': 'Athletes',
  'Planes': 'Plans',
  'Estructurado': 'Structured',
  'Cada semana planificada. Sin improvisar.': 'Every week planned. No improvising.',
  'Probado': 'Proven',
  'Método aplicado con cientos de atletas.': 'A method used with hundreds of athletes.',
  'Coordinás por WhatsApp y recibís el plan para empezar.':
    'Coordinate through WhatsApp and receive the plan to start.',
  'Resultados': 'Results',
  'Fuerza, resistencia y físico bajo un mismo enfoque.': 'Strength, endurance and physique under one approach.',

  'Elegí tu plan': 'Choose your plan',
  'Tres caminos claros para entrenar con estructura según tu objetivo principal.':
    'Three clear paths to train with structure according to your main goal.',
  '¿No sabés cuál elegir?': 'Not sure which one to choose?',
  'Hacé el test': 'Take the test',
  'Todos': 'All',
  'Híbrido': 'Hybrid',
  'Resistencia': 'Endurance',
  'Hipertrofia': 'Hypertrophy',
  'Plan Híbrido': 'Hybrid Plan',
  'Plan Resistencia / Velocidad': 'Endurance / Speed Plan',
  'Plan Fuerza / Hipertrofia': 'Strength / Hypertrophy Plan',
  'Fuerza, resistencia y variedad para construir un físico atlético y completo.':
    'Strength, endurance and variety to build a complete athletic physique.',
  'Para quienes quieren verse mejor y rendir mejor sin enfocarse en una sola cosa.':
    'For people who want to look better and perform better without focusing on only one thing.',
  'Para cansarte menos, correr mejor, mejorar ritmo y ganar capacidad física.':
    'To get less tired, run better, improve pace and build physical capacity.',
  'Para quienes quieren rendir más, moverse mejor y sentirse con más aire.':
    'For people who want to perform better, move better and feel less out of breath.',
  'Para ganar músculo, mejorar fuerza y construir un físico más sólido.':
    'To build muscle, improve strength and build a more solid physique.',
  'Para quienes priorizan verse más fuertes y progresar con estructura de gimnasio.':
    'For people who prioritize looking stronger and progressing with a structured gym plan.',
  'Comprar plan': 'Buy plan',
  'Comprar ahora': 'Buy now',
  'Cerrar': 'Close',
  'Duración': 'Duration',
  'Nivel': 'Level',
  'Objetivo': 'Goal',
  'Requisitos': 'Requirements',
  'Qué incluye': 'What is included',
  'Entrega y precio': 'Delivery and price',
  '12 semanas': '12 weeks',
  'Adaptable': 'Adaptable',
  'Combinar fuerza y resistencia con una progresión equilibrada.':
    'Combine strength and endurance with balanced progression.',
  'Gimnasio básico y disponibilidad para entrenar fuerza y resistencia durante la semana.':
    'Basic gym access and availability to train strength and endurance during the week.',
  'Mejorar resistencia, velocidad, ritmo y tolerancia al esfuerzo.':
    'Improve endurance, speed, pace and effort tolerance.',
  'Poder caminar, trotar o correr según tu nivel actual.':
    'Be able to walk, jog or run according to your current level.',
  'Ganar fuerza y masa muscular con una progresión clara.':
    'Build strength and muscle mass with clear progression.',
  'Acceso a gimnasio y compromiso para seguir una rutina estructurada.':
    'Gym access and commitment to follow a structured routine.',
  'Acceso digital al plan después de coordinar la compra por WhatsApp.':
    'Digital access to the plan after coordinating the purchase on WhatsApp.',
  'Coordinación final por WhatsApp.': 'Final coordination through WhatsApp.',
  'Distribución semanal de fuerza y resistencia': 'Weekly strength and endurance split',
  'Progresión clara para sostener el rendimiento': 'Clear progression to sustain performance',
  'Indicaciones simples para ajustar intensidad y recuperación':
    'Simple guidance to adjust intensity and recovery',
  'Sesiones progresivas de resistencia': 'Progressive endurance sessions',
  'Trabajos para mejorar ritmo y velocidad': 'Workouts to improve pace and speed',
  'Control simple de intensidad y recuperación': 'Simple intensity and recovery control',
  'Rutina de fuerza e hipertrofia': 'Strength and hypertrophy routine',
  'Progresión de cargas y volumen': 'Load and volume progression',
  'Indicaciones para ejecutar y ajustar cada semana': 'Guidance to execute and adjust each week',
  '¿Es solo para gente avanzada?': 'Is it only for advanced people?',
  'No. Se puede ajustar al punto de partida siempre que puedas entrenar con constancia.':
    'No. It can be adjusted to your starting point as long as you can train consistently.',
  '¿Sirve si quiero mejorar físico y rendimiento?': 'Does it work if I want to improve physique and performance?',
  'Sí. Es el plan pensado justamente para combinar estética, fuerza y capacidad física.':
    'Yes. This plan is designed to combine aesthetics, strength and physical capacity.',
  '¿Sirve si no corro rápido?': 'Does it work if I do not run fast?',
  'Sí. El objetivo es mejorar desde tu punto actual, no arrancar desde un nivel avanzado.':
    'Yes. The goal is to improve from your current point, not to start from an advanced level.',
  '¿También mejora mi condición general?': 'Does it also improve my general conditioning?',
  'Sí. Está pensado para que rindas más, te canses menos y puedas sostener mejor los esfuerzos.':
    'Yes. It is designed so you perform better, get less tired and sustain effort better.',
  '¿Es solo para ganar músculo?': 'Is it only for building muscle?',
  'No. El foco principal es músculo y fuerza, pero con una estructura que también mejora tu rendimiento en el gimnasio.':
    'No. The main focus is muscle and strength, with structure that also improves your gym performance.',
  '¿Necesito mucha experiencia?': 'Do I need a lot of experience?',
  'No hace falta ser avanzado, pero sí tener acceso a gimnasio y ganas de seguir una progresión.':
    'You do not need to be advanced, but you do need gym access and willingness to follow a progression.',

  'Test de recomendación': 'Recommendation test',
  '¿NO SABES QUE PLAN ELEGIR?': 'NOT SURE WHICH PLAN TO CHOOSE?',
  'Encontrá tu plan': 'Find your plan',
  'Paso 1/6': 'Step 1/6',
  '17%': '17%',
  '¿Qué querés mejorar primero?': 'What do you want to improve first?',
  'Elegí una opción para continuar.': 'Choose an option to continue.',
  'Siguiente': 'Next',
  'Atrás': 'Back',
  'Rehacer test': 'Retake test',
  'TU PLAN RECOMENDADO': 'YOUR RECOMMENDED PLAN',
  'PLAN HÍBRIDO': 'HYBRID PLAN',
  'Por qué te lo recomendamos:': 'Why we recommend it:',
  'VER PLAN HÍBRIDO': 'VIEW HYBRID PLAN',
  'Ideal para vos si querés un físico atlético y completo, combinando fuerza, resistencia y variedad sin enfocarte en una sola cosa.':
    'Ideal if you want a complete athletic physique, combining strength, endurance and variety without focusing on only one thing.',
  'Tus respuestas muestran que no buscás solo músculo ni solo resistencia: querés verte mejor, sentirte más capaz y entrenar de forma más completa.':
    'Your answers show that you are not looking only for muscle or only for endurance: you want to look better, feel more capable and train in a more complete way.',

  'Para quienes quieren más': 'For those who want more',
  'El nivel más alto de acompañamiento.': 'The highest level of support.',
  'Diseño tu entrenamiento, nutrición y hábitos según tu situación real, tu objetivo y tu disponibilidad. Esto no es para todos: requiere compromiso, comunicación y trabajo serio.':
    'I design your training, nutrition and habits around your real situation, goal and availability. This is not for everyone: it requires commitment, communication and serious work.',
  'Si querés resultados más rápidos y un plan 100% adaptado a vos, la mentoría es el camino.':
    'If you want faster results and a plan fully adapted to you, mentorship is the path.',
  'Aplicar a mentoría': 'Apply for mentorship',
  'Cupos limitados. Solo acepto atletas comprometidos.': 'Limited spots. I only accept committed athletes.',
  'Años de experiencia': 'Years of experience',

  'Historia': 'Story',
  'Soy Nahuel, profesor de educación física, oficial del Ejército Argentino y entrenador especializado en llevar el rendimiento físico al siguiente nivel.':
    'I am Nahuel, a physical education teacher, Argentine Army officer and coach specialized in taking physical performance to the next level.',
  'Durante más de 8 años formé y entrené bajo estándares militares reales, donde no hay margen para improvisar: se entrena con disciplina, estructura y objetivos claros. Hoy aplico ese mismo enfoque para ayudarte a transformar tu físico y tu rendimiento, sin perder tiempo en métodos que no funcionan.':
    'For more than 8 years I trained and developed under real military standards, where there is no room to improvise: training is built on discipline, structure and clear goals. Today I apply that same approach to help transform your physique and performance without wasting time on methods that do not work.',
  'Mi sistema combina fuerza, resistencia y mentalidad, para que no solo mejores cómo te ves, sino también cómo rendís y cómo vivís. No se trata de entrenar más, sino de entrenar mejor, con un plan diseñado para vos.':
    'My system combines strength, endurance and mindset, so you improve not only how you look, but also how you perform and how you live. It is not about training more, but training better, with a plan designed for you.',
  'Si buscás resultados reales, constancia y un cambio que se mantenga en el tiempo, estás en el lugar correcto.':
    'If you are looking for real results, consistency and a change that lasts over time, you are in the right place.',
  'Entrená con propósito. Rendí al máximo. Convertite en tu mejor versión.':
    'Train with purpose. Perform at your best. Become your best version.',
  '“La consistencia es el verdadero superpoder.”': '“Consistency is the real superpower.”',
  '“No se trata de motivación, se trata de identidad.”': '“It is not about motivation, it is about identity.”',
  '“Construir el cuerpo correcto empieza por ordenar la vida.”':
    '“Building the right body starts by organizing your life.”',

  'Dudas frecuentes': 'Common questions',
  'Resolvé las objeciones típicas antes de elegir tu plan o aplicar a mentoría.':
    'Clear the usual doubts before choosing your plan or applying for mentorship.',
  '¿Necesito experiencia para empezar?': 'Do I need experience to start?',
  'No necesariamente. La recomendación depende de tu objetivo y de tu punto de partida.':
    'Not necessarily. The recommendation depends on your goal and starting point.',
  '¿Cuándo recibo el plan?': 'When do I receive the plan?',
  'Después de coordinar la compra por WhatsApp, recibís el acceso digital para empezar.':
    'After coordinating the purchase through WhatsApp, you receive digital access to start.',
  '¿Cómo sé qué plan me conviene?': 'How do I know which plan suits me?',
  'Podés hacer el test “Encontrá tu plan”. Te recomienda una opción según tus respuestas.':
    'You can take the “Find your plan” test. It recommends an option based on your answers.',
  '¿Puedo hacerlo si entreno en gimnasio?': 'Can I do it if I train at a gym?',
  'Sí. Los planes de fuerza e híbrido contemplan trabajo de gimnasio con estructura.':
    'Yes. The strength and hybrid plans include structured gym work.',
  '¿Qué pasa si no sé qué plan elegir?': 'What if I do not know which plan to choose?',
  'Podés hacer el test “Encontrá tu plan”. Te va a recomendar una opción según tu objetivo, preferencias y prioridades de entrenamiento.':
    'You can take the “Find your plan” test. It will recommend an option based on your goal, preferences and training priorities.',
  'Hacer el test': 'Take the test',
  '¿Incluye nutrición?': 'Does it include nutrition?',
  'Los planes se enfocan en entrenamiento. La adaptación completa de nutrición, hábitos y seguimiento corresponde a la mentoría 1:1.':
    'The plans focus on training. Full nutrition, habits and follow-up adaptation belongs to 1:1 mentorship.',
  '¿La mentoría es para cualquiera?': 'Is mentorship for everyone?',
  'No. Es para personas comprometidas que quieren seguimiento real y están dispuestas a trabajar en serio.':
    'No. It is for committed people who want real follow-up and are willing to work seriously.',

  'Dejá de improvisar.': 'Stop improvising.',
  'Empezá con un plan.': 'Start with a plan.',
  'Elegí el plan que mejor se adapta a tu objetivo y entrená con estructura desde hoy.':
    'Choose the plan that best fits your goal and train with structure from today.',

  'Entrenamiento online para fuerza, running y físico atlético.':
    'Online training for strength, running and an athletic physique.',
  'Programas estructurados. Resultados reales.': 'Structured programs. Real results.',
  'Web': 'Web',
  'Empezá': 'Start',
  'Seguime': 'Follow me',
  'Seguime para tips, entrenamientos y novedades.': 'Follow me for tips, training and updates.',
  '© 2026 Nahuel Lifts. Todos los derechos reservados.': '© 2026 Nahuel Lifts. All rights reserved.',
  'Volver arriba': 'Back to top'
};

export function initI18n() {
  const bindings = collectBindings();
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-language-button]'));

  const savedLanguage = getSavedLanguage();

  const applyLanguage = (language: Language) => {
    document.documentElement.lang = language;
    document.title = language === 'en' ? 'Nahuel Lifts | Training plans' : 'Nahuel Lifts | Planes de entrenamiento';

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content =
        language === 'en'
          ? 'Structured plans for strength, endurance, hypertrophy and hybrid performance.'
          : 'Planes estructurados para fuerza, resistencia, hipertrofia y rendimiento híbrido.';
    }

    bindings.forEach(({ node, key, leading, trailing }) => {
      node.textContent = `${leading}${language === 'en' ? en[key] : key}${trailing}`;
    });

    const heroTitlePrimary = document.querySelector<HTMLElement>('[data-hero-title-primary]');
    const heroTitleSecondary = document.querySelector<HTMLElement>('[data-hero-title-secondary]');
    if (heroTitlePrimary && heroTitleSecondary) {
      heroTitlePrimary.textContent = language === 'en' ? 'Plans that' : 'Programas que';
      heroTitleSecondary.textContent = language === 'en' ? 'actually work' : 'realmente funcionan';
    }

    buttons.forEach((button) => {
      const isActive = button.dataset.languageButton === language;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // Ignore storage failures; the switch still works for the current page view.
    }

    window.dispatchEvent(new CustomEvent('nahuel-language-change', { detail: { language } }));
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const language = button.dataset.languageButton === 'en' ? 'en' : 'es';
      applyLanguage(language);
    });
  });

  applyLanguage(savedLanguage);
}

function collectBindings(): Binding[] {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }

      const key = normalize(node.textContent || '');
      return key && en[key] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const bindings: Binding[] = [];
  let current = walker.nextNode() as Text | null;

  while (current) {
    const value = current.textContent || '';
    const key = normalize(value);
    bindings.push({
      node: current,
      key,
      leading: value.match(/^\s*/)?.[0] || '',
      trailing: value.match(/\s*$/)?.[0] || ''
    });
    current = walker.nextNode() as Text | null;
  }

  return bindings;
}

function normalize(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function getSavedLanguage(): Language {
  try {
    return window.localStorage.getItem(storageKey) === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
}
