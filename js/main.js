import { millisecondsToHours, isLeapYear, getYear, getHours, isPast, parseISO } from 'date-fns';

let countDown;

const UI_ELEM = {
  CLOCK: document.querySelector('.count__clock'),
  SECONDS: document.querySelector('.count__seconds'),
  HOURS: document.querySelector('.count__hours'),
  DAYS: document.querySelector('.count__days'),
  YEARS: document.querySelector('.count__years'),
  BUTTON: document.querySelector('.count__btn'),
  INPUT: document.querySelector('.count__input'),
}

function getTimeRemaining(endtime) {
  // if (isNaN(endtime)) {
  //   return;
  // }
  const remainingTime = Date.parse(endtime) - Date.parse(new Date());
  const hours = millisecondsToHours(remainingTime);
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const years = isLeapYear(getYear(parseISO(endtime))) ?
    Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 366)) :
    Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 365));
  return {
    remainingTime,
    hours,
    days,
    years
  };
}

function displayTimeleft() {
  const deadline = UI_ELEM.INPUT.value;

  if (isPast(parseISO(deadline))) {
    return;
  }
  const remainsDate = getTimeRemaining(deadline);
  console.log(remainsDate);

  UI_ELEM.HOURS.innerText = remainsDate.hours;
  UI_ELEM.DAYS.innerText = remainsDate.days;
  UI_ELEM.YEARS.innerText = remainsDate.years;
}

function setCountDown() {
  clearInterval(countDown);

  displayTimeleft()
  const deadlines = UI_ELEM.INPUT.value;
  const remainsDates = getTimeRemaining(deadlines);
  countDown = setInterval(() => {
    const hoursLeft = remainsDates.hours - getHours(new Date());
    if (hoursLeft < 0) {
      clearInterval(countDown);
      return;
    }
    displayTimeleft()
  }, 3600000);
}

UI_ELEM.BUTTON.addEventListener('click', setCountDown);
