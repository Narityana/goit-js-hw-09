const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerChangeColor = null;
btnStop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColor() {
  let colorEl = getRandomHexColor();
  bodyEl.style.backgroundColor = colorEl;
}

btnStart.addEventListener('click', onStartClick);
function onStartClick() {
  timerChangeColor = setInterval(changeColor, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

btnStop.addEventListener('click', onStopClick);
function onStopClick() {
  clearInterval(timerChangeColor);
  btnStart.disabled = false;
  btnStop.disabled = true;
}
