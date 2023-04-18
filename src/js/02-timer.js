import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const myInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let intervalId = null;
let currentUserDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure(
        'Please choose a date in the future',
        {
          width: '500px',
          position: 'center-top',
          fontSize: '20px',
        },
        (btnStart.disabled = true)
      );
    } else {
      btnStart.disabled = false;
      currentUserDate = selectedDates[0];
    }
  },

  // onChange(selectedDates) {
  //   if (selectedDates[0] <= new Date()) {
  //     btnStart.disabled = true;
  //   }
  // },
};

const fp = flatpickr(myInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateIndicatorTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

btnStart.addEventListener('click', onclick);

function onclick() {
  btnStart.disabled = true;
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = currentUserDate - currentTime;

    if (diff <= 0) {
      clearInterval(intervalId);
      return;
    }
    updateIndicatorTimer(convertMs(diff));
  }, 1000);
}
