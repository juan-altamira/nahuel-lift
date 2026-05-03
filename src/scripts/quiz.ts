type Language = 'es' | 'en';

type ResultId = 'strength' | 'endurance' | 'hybrid';

type Scores = Record<ResultId, number>;

type QuizOption = {
  es: string;
  en: string;
  result: ResultId;
  scores: Partial<Scores>;
};

type QuizQuestion = {
  id: 'mainGoal' | 'trainingStyle' | 'currentIssue' | 'twelveWeekResult' | 'weeklyStyle' | 'identity';
  es: string;
  en: string;
  options: QuizOption[];
};

type QuizResult = {
  title: Record<Language, string>;
  description: Record<Language, string>;
  reason: Record<Language, string>;
  cta: Record<Language, string>;
  filter: 'hybrid' | 'running' | 'hypertrophy';
};

const emptyScores: Scores = {
  strength: 0,
  endurance: 0,
  hybrid: 0
};

const questions: QuizQuestion[] = [
  {
    id: 'mainGoal',
    es: '¿Qué querés mejorar primero?',
    en: 'What do you want to improve first?',
    options: [
      {
        es: 'Quiero verme más fuerte, con más músculo y mejor físico',
        en: 'I want to look stronger, with more muscle and a better physique',
        result: 'strength',
        scores: { strength: 5 }
      },
      {
        es: 'Quiero cansarme menos, correr mejor y tener más resistencia',
        en: 'I want to get less tired, run better and build more endurance',
        result: 'endurance',
        scores: { endurance: 5 }
      },
      {
        es: 'Quiero verme bien y también sentirme más atlético',
        en: 'I want to look good and also feel more athletic',
        result: 'hybrid',
        scores: { hybrid: 5 }
      }
    ]
  },
  {
    id: 'trainingStyle',
    es: '¿Qué tipo de entrenamiento te dan más ganas de hacer?',
    en: 'What type of training are you most excited to do?',
    options: [
      {
        es: 'Entrenar en gimnasio, levantar peso y ver progreso en mi cuerpo',
        en: 'Train at the gym, lift weights and see progress in my body',
        result: 'strength',
        scores: { strength: 3 }
      },
      {
        es: 'Correr, moverme mejor, mejorar tiempos o aguantar más',
        en: 'Run, move better, improve times or last longer',
        result: 'endurance',
        scores: { endurance: 3 }
      },
      {
        es: 'Mezclar gimnasio, running y entrenamientos variados',
        en: 'Mix gym, running and varied workouts',
        result: 'hybrid',
        scores: { hybrid: 3 }
      }
    ]
  },
  {
    id: 'currentIssue',
    es: '¿Qué te molesta más de tu estado actual?',
    en: 'What bothers you most about your current state?',
    options: [
      {
        es: 'No ver cambios físicos o sentir que no gano fuerza',
        en: 'Not seeing physical changes or feeling like I am not gaining strength',
        result: 'strength',
        scores: { strength: 3 }
      },
      {
        es: 'Cansarme rápido o sentir que me falta aire',
        en: 'Getting tired quickly or feeling out of breath',
        result: 'endurance',
        scores: { endurance: 3 }
      },
      {
        es: 'Sentirme desbalanceado: capaz mejoro una cosa, pero descuido otra',
        en: 'Feeling unbalanced: I may improve one thing, but neglect another',
        result: 'hybrid',
        scores: { hybrid: 3 }
      }
    ]
  },
  {
    id: 'twelveWeekResult',
    es: 'Si entrenaras durante 12 semanas, ¿qué resultado te importaría más?',
    en: 'If you trained for 12 weeks, what result would matter most?',
    options: [
      {
        es: 'Notar más músculo, más forma y más fuerza',
        en: 'Notice more muscle, more shape and more strength',
        result: 'strength',
        scores: { strength: 4 }
      },
      {
        es: 'Aguantar más, moverme mejor y mejorar mi ritmo',
        en: 'Last longer, move better and improve my pace',
        result: 'endurance',
        scores: { endurance: 4 }
      },
      {
        es: 'Sentirme más completo: fuerte, ágil y resistente',
        en: 'Feel more complete: strong, agile and resistant',
        result: 'hybrid',
        scores: { hybrid: 4 }
      }
    ]
  },
  {
    id: 'weeklyStyle',
    es: '¿Cómo te gustaría que sea tu semana de entrenamiento?',
    en: 'What would you like your training week to look like?',
    options: [
      {
        es: 'Más enfocada en gimnasio y ejercicios de fuerza',
        en: 'More focused on gym and strength exercises',
        result: 'strength',
        scores: { strength: 3 }
      },
      {
        es: 'Más enfocada en correr, mejorar condición y velocidad',
        en: 'More focused on running, conditioning and speed',
        result: 'endurance',
        scores: { endurance: 3 }
      },
      {
        es: 'Balanceada: algunos días fuerza y otros resistencia',
        en: 'Balanced: some strength days and some endurance days',
        result: 'hybrid',
        scores: { hybrid: 3 }
      }
    ]
  },
  {
    id: 'identity',
    es: '¿Cuál de estas frases te representa mejor?',
    en: 'Which sentence represents you best?',
    options: [
      {
        es: 'Quiero construir un cuerpo más fuerte y con más músculo.',
        en: 'I want to build a stronger body with more muscle.',
        result: 'strength',
        scores: { strength: 5 }
      },
      {
        es: 'Quiero rendir más, cansarme menos y moverme mejor.',
        en: 'I want to perform better, get less tired and move better.',
        result: 'endurance',
        scores: { endurance: 5 }
      },
      {
        es: 'Quiero un físico atlético, no solo verme bien o solo correr mejor.',
        en: 'I want an athletic physique, not just to look good or only run better.',
        result: 'hybrid',
        scores: { hybrid: 5 }
      }
    ]
  }
];

const results: Record<ResultId, QuizResult> = {
  strength: {
    title: {
      es: 'PLAN FUERZA / HIPERTROFIA',
      en: 'STRENGTH / HYPERTROPHY PLAN'
    },
    description: {
      es: 'Ideal para vos si querés ganar músculo, mejorar tu fuerza y construir un físico más sólido con una progresión clara de gimnasio.',
      en: 'Ideal if you want to build muscle, improve strength and create a more solid physique with clear gym progression.'
    },
    reason: {
      es: 'Tus respuestas muestran que tu prioridad principal es cambiar tu físico, verte más fuerte y progresar con entrenamientos enfocados en fuerza y músculo.',
      en: 'Your answers show that your main priority is changing your physique, looking stronger and progressing with training focused on strength and muscle.'
    },
    cta: {
      es: 'VER PLAN FUERZA / HIPERTROFIA',
      en: 'VIEW STRENGTH / HYPERTROPHY PLAN'
    },
    filter: 'hypertrophy'
  },
  endurance: {
    title: {
      es: 'PLAN RESISTENCIA / VELOCIDAD',
      en: 'ENDURANCE / SPEED PLAN'
    },
    description: {
      es: 'Ideal para vos si querés cansarte menos, correr mejor, ganar velocidad y mejorar tu capacidad física general.',
      en: 'Ideal if you want to get less tired, run better, gain speed and improve your overall physical capacity.'
    },
    reason: {
      es: 'Tus respuestas muestran que tu prioridad principal es rendir más, mejorar tu resistencia y sentirte con más aire y velocidad.',
      en: 'Your answers show that your main priority is performing better, improving endurance and feeling more capable with more speed.'
    },
    cta: {
      es: 'VER PLAN RESISTENCIA / VELOCIDAD',
      en: 'VIEW ENDURANCE / SPEED PLAN'
    },
    filter: 'running'
  },
  hybrid: {
    title: {
      es: 'PLAN HÍBRIDO',
      en: 'HYBRID PLAN'
    },
    description: {
      es: 'Ideal para vos si querés un físico atlético y completo, combinando fuerza, resistencia y variedad sin enfocarte en una sola cosa.',
      en: 'Ideal if you want a complete athletic physique, combining strength, endurance and variety without focusing on only one thing.'
    },
    reason: {
      es: 'Tus respuestas muestran que no buscás solo músculo ni solo resistencia: querés verte mejor, sentirte más capaz y entrenar de forma más completa.',
      en: 'Your answers show that you are not looking only for muscle or only for endurance: you want to look better, feel more capable and train in a more complete way.'
    },
    cta: {
      es: 'VER PLAN HÍBRIDO',
      en: 'VIEW HYBRID PLAN'
    },
    filter: 'hybrid'
  }
};

const copy = {
  es: {
    step: 'Paso',
    result: 'Resultado',
    choose: 'Elegí una opción para continuar.',
    next: 'Siguiente',
    seeResult: 'Ver resultado',
    back: 'Atrás',
    redo: 'Rehacer test'
  },
  en: {
    step: 'Step',
    result: 'Result',
    choose: 'Choose an option to continue.',
    next: 'Next',
    seeResult: 'See result',
    back: 'Back',
    redo: 'Retake test'
  }
};

export function initPlanQuiz() {
  const root = document.querySelector<HTMLElement>('[data-plan-quiz]');
  if (!root) return;

  const openButtons = Array.from(document.querySelectorAll<HTMLElement>('[data-open-quiz]'));
  const progressLabel = root.querySelector<HTMLElement>('[data-quiz-progress-label]');
  const progressPercent = root.querySelector<HTMLElement>('[data-quiz-progress-percent]');
  const progress = root.querySelector<HTMLElement>('[data-quiz-progress]');
  const progressBar = root.querySelector<HTMLElement>('[data-quiz-progress-bar]');
  const stepPanel = root.querySelector<HTMLElement>('[data-quiz-step-panel]');
  const questionNode = root.querySelector<HTMLElement>('[data-quiz-question]');
  const optionsNode = root.querySelector<HTMLElement>('[data-quiz-options]');
  const errorNode = root.querySelector<HTMLElement>('[data-quiz-error]');
  const backButton = root.querySelector<HTMLButtonElement>('[data-quiz-back]');
  const nextButton = root.querySelector<HTMLButtonElement>('[data-quiz-next]');
  const restartButton = root.querySelector<HTMLButtonElement>('[data-quiz-restart]');
  const resultButton = root.querySelector<HTMLButtonElement>('[data-quiz-result-cta]');
  const resultNode = root.querySelector<HTMLElement>('[data-quiz-result]');

  if (
    !progressLabel ||
    !progressPercent ||
    !progress ||
    !progressBar ||
    !stepPanel ||
    !questionNode ||
    !optionsNode ||
    !errorNode ||
    !backButton ||
    !nextButton ||
    !restartButton ||
    !resultButton ||
    !resultNode
  ) {
    return;
  }

  let language = getLanguage();
  let currentStep = 0;
  let answers: number[] = [];
  let currentResult: ResultId = 'hybrid';

  const render = () => {
    language = getLanguage();
    const isResult = currentStep >= questions.length;
    const percent = isResult ? 100 : Math.round(((currentStep + 1) / questions.length) * 100);

    progressLabel.textContent = isResult
      ? copy[language].result
      : `${copy[language].step} ${currentStep + 1}/${questions.length}`;
    progressPercent.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;
    progress.setAttribute('aria-valuenow', String(percent));

    stepPanel.hidden = isResult;
    resultNode.hidden = !isResult;
    nextButton.hidden = isResult;
    resultButton.hidden = !isResult;
    restartButton.hidden = !isResult;
    backButton.hidden = currentStep === 0 && !isResult;
    backButton.textContent = copy[language].back;

    if (isResult) {
      renderResult();
      return;
    }

    const question = questions[currentStep];
    questionNode.textContent = question[language];
    errorNode.hidden = true;
    nextButton.textContent = currentStep === questions.length - 1 ? copy[language].seeResult : copy[language].next;

    optionsNode.replaceChildren(
      ...question.options.map((option, optionIndex) => {
        const button = document.createElement('button');
        const label = document.createElement('span');
        button.type = 'button';
        button.className = 'quiz-option';
        label.textContent = option[language];
        button.append(label);
        button.setAttribute('aria-pressed', String(answers[currentStep] === optionIndex));
        button.classList.toggle('is-selected', answers[currentStep] === optionIndex);
        button.addEventListener('click', () => {
          answers[currentStep] = optionIndex;
          errorNode.hidden = true;
          render();
        });
        return button;
      })
    );
  };

  const animateRender = () => {
    stepPanel.classList.add('is-switching');
    resultNode.classList.add('is-switching');
    window.setTimeout(() => {
      render();
      stepPanel.classList.remove('is-switching');
      resultNode.classList.remove('is-switching');
    }, 140);
  };

  openButtons.forEach((button) =>
    button.addEventListener('click', (event) => {
      event.preventDefault();
      if (currentStep >= questions.length) {
        currentStep = 0;
        answers = [];
        render();
      }
      root.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => root.focus({ preventScroll: true }), 380);
    })
  );

  backButton.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep -= 1;
      animateRender();
    }
  });

  nextButton.addEventListener('click', () => {
    if (answers[currentStep] === undefined) {
      errorNode.textContent = copy[language].choose;
      errorNode.hidden = false;
      stepPanel.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-5px)' },
          { transform: 'translateX(5px)' },
          { transform: 'translateX(0)' }
        ],
        { duration: 180, easing: 'ease-out' }
      );
      return;
    }

    currentStep += 1;
    animateRender();
  });

  restartButton.addEventListener('click', () => {
    currentStep = 0;
    answers = [];
    animateRender();
  });

  resultButton.addEventListener('click', () => {
    const result = results[currentResult];
    document.querySelector<HTMLButtonElement>(`[data-filter="${result.filter}"]`)?.click();
    document.querySelector('#selector-programas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  window.addEventListener('nahuel-language-change', () => {
    language = getLanguage();
    render();
  });

  function renderResult() {
    currentResult = getWinningResult();
    const result = results[currentResult];

    setText('[data-result-title]', result.title[language]);
    setText('[data-result-description]', result.description[language]);
    setText('[data-result-reason]', result.reason[language]);
    resultButton.replaceChildren(document.createTextNode(result.cta[language]), createArrowIcon());

    restartButton.replaceChildren(createRestartIcon(), document.createTextNode(copy[language].redo));
  }

  function getWinningResult(): ResultId {
    const scores = scoreAnswers();
    const maxScore = Math.max(...Object.values(scores));
    const tied = (Object.entries(scores) as [ResultId, number][])
      .filter(([, score]) => score === maxScore)
      .map(([id]) => id);
    const firstChoice = questions[0].options[answers[0]]?.result ?? 'hybrid';
    const isStrengthEnduranceTie =
      tied.length === 2 && tied.includes('strength') && tied.includes('endurance') && !tied.includes('hybrid');

    if (isStrengthEnduranceTie && firstChoice === 'hybrid') return 'hybrid';
    if (tied.includes(firstChoice)) return firstChoice;

    return tied[0] ?? 'hybrid';
  }

  function scoreAnswers(): Scores {
    const scores = { ...emptyScores };

    answers.forEach((optionIndex, questionIndex) => {
      const option = questions[questionIndex]?.options[optionIndex];
      if (!option) return;

      (Object.entries(option.scores) as [ResultId, number][]).forEach(([id, score]) => {
        scores[id] += score || 0;
      });
    });

    return scores;
  }

  function setText(selector: string, value: string) {
    const node = root.querySelector<HTMLElement>(selector);
    if (node) node.textContent = value;
  }

  render();
}

function createRestartIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>';
  return svg;
}

function createArrowIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '17');
  svg.setAttribute('height', '17');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>';
  return svg;
}

function getLanguage(): Language {
  return document.documentElement.lang === 'en' ? 'en' : 'es';
}
