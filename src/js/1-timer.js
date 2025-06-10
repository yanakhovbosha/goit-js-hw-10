import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');

const btnStart = document.querySelector('body button[data-start]');
btnStart.classList.add('btn-start');

const dataDays = document.querySelector('span[data-days]');

const dataHours = document.querySelector('span[data-hours]');

const dataMinutes = document.querySelector('span[data-minutes]');

const dataSeconds = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

let userSelectedDate;

let interval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    const newDate = new Date();
    if (userSelectedDate < newDate) {
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: 'pink',
        position: 'topRight',
      });
      btnStart.disabled = true;
      return;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(input, options);

btnStart.addEventListener('click', btnStartTime);

function btnStartTime(event) {
  interval = setInterval(() => {
    const currentTime = userSelectedDate.getTime();
    const deltaTime = currentTime - Date.now();
    const timerConvert = convertMs(deltaTime);

    dataDays.textContent = timerConvert.days;
    dataHours.textContent = timerConvert.hours;
    dataMinutes.textContent = timerConvert.minutes;
    dataSeconds.textContent = timerConvert.seconds;

    if (deltaTime <= 0) {
      clearInterval(interval);
      dataDays.textContent = '00';
      dataHours.textContent = '00';
      dataMinutes.textContent = '00';
      dataSeconds.textContent = '00';
      input.disabled = false;
    }
  }, 1000);

  input.disabled = true;
  btnStart.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
