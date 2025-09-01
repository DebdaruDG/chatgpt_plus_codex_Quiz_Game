export function render(state) {
  const app = document.getElementById('app');
  app.textContent = '';
  if (!state.started) {
    renderStart(state, app);
    return;
  }
  if (state.showSummary) {
    renderSummary(state, app);
    return;
  }
  renderQuestion(state, app);
}

function renderStart(state, container) {
  const card = document.createElement('div');
  card.className = 'card';

  const h1 = document.createElement('h1');
  h1.textContent = 'Quiz Game';
  card.appendChild(h1);

  const label = document.createElement('label');
  label.className = 'mt-3 flex align-center';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = state.timerEnabled;
  checkbox.setAttribute('data-action', 'toggle-timer');
  label.appendChild(checkbox);
  const span = document.createElement('span');
  span.textContent = 'Enable 15s timer';
  span.className = 'ml-2';
  label.appendChild(span);
  card.appendChild(label);

  const startBtn = document.createElement('button');
  startBtn.textContent = 'Start Quiz';
  startBtn.className = 'mt-3';
  startBtn.setAttribute('data-action', 'start');
  card.appendChild(startBtn);

  container.appendChild(card);
}

function renderQuestion(state, container) {
  const question = state.questions[state.currentIndex];
  const card = document.createElement('div');
  card.className = 'card';

  const h2 = document.createElement('h2');
  h2.textContent = `Q${state.currentIndex + 1}. ${question.text}`;
  card.appendChild(h2);

  if (state.timerEnabled) {
    const timer = document.createElement('div');
    timer.textContent = `Time left: ${state.timeLeft}s`;
    timer.className = 'mt-2';
    card.appendChild(timer);
  }

  const list = document.createElement('ul');
  list.className = 'options';
  question.options.forEach((opt, idx) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.setAttribute('data-option', idx);
    const selected = state.answers[question.id];
    if (selected === idx) {
      btn.classList.add('selected');
    }
    li.appendChild(btn);
    list.appendChild(li);
  });
  card.appendChild(list);

  const nextBtn = document.createElement('button');
  nextBtn.textContent = state.currentIndex === state.questions.length - 1 ? 'Finish' : 'Next';
  nextBtn.className = 'mt-3';
  nextBtn.setAttribute('data-action', 'next');
  if (state.answers[question.id] === undefined) {
    nextBtn.disabled = true;
  }
  card.appendChild(nextBtn);

  container.appendChild(card);
}

function renderSummary(state, container) {
  const card = document.createElement('div');
  card.className = 'card';

  const h2 = document.createElement('h2');
  h2.textContent = 'Summary';
  card.appendChild(h2);

  const correct = state.questions.filter(q => state.answers[q.id] === q.answer).length;
  const p = document.createElement('p');
  p.textContent = `You scored ${correct} / ${state.questions.length}`;
  card.appendChild(p);

  state.questions.forEach(q => {
    const div = document.createElement('div');
    div.className = 'summary-item';
    const qText = document.createElement('div');
    qText.textContent = q.text;
    div.appendChild(qText);
    const your = document.createElement('div');
    const yourAns = state.answers[q.id] !== undefined ? q.options[state.answers[q.id]] : 'No answer';
    your.textContent = `Your answer: ${yourAns}`;
    div.appendChild(your);
    const correctAns = document.createElement('div');
    correctAns.textContent = `Correct answer: ${q.options[q.answer]}`;
    div.appendChild(correctAns);
    card.appendChild(div);
  });

  const restartBtn = document.createElement('button');
  restartBtn.textContent = 'Restart';
  restartBtn.className = 'mt-3';
  restartBtn.setAttribute('data-action', 'restart');
  card.appendChild(restartBtn);

  container.appendChild(card);
}
