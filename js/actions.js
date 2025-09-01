import { resetState } from './state.js';
import { isValidOption } from './validators.js';

const QUESTION_TIME = 15;

export function selectOption(state, index) {
  const question = state.questions[state.currentIndex];
  if (!isValidOption(index, question.options)) return state;
  return {
    ...state,
    answers: { ...state.answers, [question.id]: index }
  };
}

export function next(state) {
  const last = state.currentIndex >= state.questions.length - 1;
  if (last) {
    return { ...state, showSummary: true, timeLeft: 0 };
  }
  return {
    ...state,
    currentIndex: state.currentIndex + 1,
    timeLeft: state.timerEnabled ? QUESTION_TIME : 0
  };
}

export function restart() {
  return resetState();
}

export function toggleTimer(state, enabled) {
  return {
    ...state,
    timerEnabled: enabled,
    timeLeft: enabled ? QUESTION_TIME : 0
  };
}

export function start(state) {
  return {
    ...state,
    started: true,
    timeLeft: state.timerEnabled ? QUESTION_TIME : 0
  };
}

export function tick(state) {
  if (!state.timerEnabled) return state;
  if (state.timeLeft <= 1) {
    return next({ ...state, timeLeft: 0 });
  }
  return { ...state, timeLeft: state.timeLeft - 1 };
}
