import { loadState, saveState } from './state.js';
import { render } from './ui.js';
import { selectOption, next, restart, toggleTimer, tick, start } from './actions.js';

let state = loadState();
render(state);

let timerId;

function persist(newState) {
  state = newState;
  saveState(state);
  render(state);
}

function startTimer() {
  clearInterval(timerId);
  if (!state.timerEnabled || !state.started || state.showSummary) return;
  timerId = setInterval(() => {
    state = tick(state);
    saveState(state);
    render(state);
    if (state.showSummary) {
      clearInterval(timerId);
    }
  }, 1000);
}

startTimer();

const app = document.getElementById('app');

app.addEventListener('click', e => {
  const option = e.target.getAttribute('data-option');
  if (option !== null) {
    persist(selectOption(state, Number(option)));
    return;
  }
  const action = e.target.getAttribute('data-action');
  if (!action) return;
  if (action === 'next') {
    persist(next(state));
    startTimer();
  } else if (action === 'restart') {
    persist(restart());
    clearInterval(timerId);
  } else if (action === 'start') {
    persist(start(state));
    startTimer();
  }
});

app.addEventListener('change', e => {
  const action = e.target.getAttribute('data-action');
  if (action === 'toggle-timer') {
    persist(toggleTimer(state, e.target.checked));
  }
});
