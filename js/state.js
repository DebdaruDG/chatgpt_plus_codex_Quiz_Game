const STORAGE_KEY = 'quiz.v1';
const VERSION = 1;

const QUESTION_BANK = [
  {
    id: 'q1',
    text: 'What is 2 + 2?',
    options: ['3', '4', '5', '22'],
    answer: 1
  },
  {
    id: 'q2',
    text: 'Capital of France?',
    options: ['Berlin', 'Paris', 'Rome', 'Madrid'],
    answer: 1
  },
  {
    id: 'q3',
    text: 'Color of the sky on a clear day?',
    options: ['Blue', 'Green', 'Red', 'Yellow'],
    answer: 0
  }
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getInitialState() {
  return {
    version: VERSION,
    questions: shuffle(QUESTION_BANK),
    currentIndex: 0,
    answers: {},
    started: false,
    timerEnabled: false,
    timeLeft: 0,
    showSummary: false
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialState();
    const data = JSON.parse(raw);
    if (data.version !== VERSION) return getInitialState();
    return data;
  } catch (e) {
    console.error('Storage unavailable', e);
    return getInitialState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Storage unavailable', e);
  }
}

export function resetState() {
  const state = getInitialState();
  saveState(state);
  return state;
}
