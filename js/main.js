import {
  millisecondsToSeconds, millisecondsToMinutes, millisecondsToHours, getHours, isPast, parseISO,
} from 'date-fns';

let countDown;

const UI_ELEM = {
  CLOCK: document.querySelector('.count__clock'),
  SECONDS: document.querySelector('.count__seconds'),
  MINUTES: document.querySelector('.count__minutes'),
  HOURS: document.querySelector('.count__hours'),
  DAYS: document.querySelector('.count__days'),
  BUTTON: document.querySelector('.count__btn'),
  INPUT: document.querySelector('.count__input'),
};

function getTimeRemaining(endtime) {
  const remainingTime = Date.parse(endtime) - Date.parse(new Date());
  const seconds = millisecondsToSeconds(remainingTime);
  const minutes = millisecondsToMinutes(remainingTime);
  const hours = millisecondsToHours(remainingTime);
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  return {
    remainingTime,
    seconds,
    minutes,
    hours,
    days,
  };
}

function displayTimeleft() {
  const deadline = UI_ELEM.INPUT.value;

  if (!deadline || isPast(parseISO(deadline))) {
    return;
  }
  const remainsDate = getTimeRemaining(deadline);

  UI_ELEM.SECONDS.innerText = remainsDate.seconds;
  UI_ELEM.MINUTES.innerText = remainsDate.minutes;
  UI_ELEM.HOURS.innerText = remainsDate.hours;
  UI_ELEM.DAYS.innerText = remainsDate.days;
}

function setCountDown() {
  clearInterval(countDown);

  displayTimeleft();
  const deadlines = UI_ELEM.INPUT.value;
  const remainsDates = getTimeRemaining(deadlines);
  countDown = setInterval(() => {
    const hoursLeft = remainsDates.hours - getHours(new Date());
    if (hoursLeft < 0) {
      clearInterval(countDown);
      return;
    }
    displayTimeleft();
  }, 1000);
}

UI_ELEM.BUTTON.addEventListener('click', setCountDown);
