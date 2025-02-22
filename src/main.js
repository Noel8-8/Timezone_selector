import MicroModal from 'micromodal';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import moment from 'moment-timezone';


MicroModal.init();
let now = dayjs();
dayjs.extend(timezone);
dayjs.extend(utc);


const time = document.querySelector('.time');
const date = document.querySelector('.date');
const timezoneElement = document.querySelector('.timezone');

timezoneElement.innerHTML = dayjs.tz.guess();
time.innerHTML = now.format('HH:mm:ss');
date.innerHTML = `${now.format('dddd, D MMMM, YYYY')}`;



setInterval(() => {
  now = dayjs();
  timezoneElement.innerHTML = dayjs.tz.guess();
  time.innerHTML = now.format('HH:mm:ss');
  date.innerHTML = `${now.format('dddd, D MMMM, YYYY')}`;
}, 1000);

// adding the menu items
const timezones = moment.tz.names();
const modalMenu = document.querySelector('.modalMenu');

const html = timezones.map((timezone) => {
  return`
  <div class="item" data-micromodal-close>
    <h2 class="timezone">${timezone}</h2>
    <p>${now.tz(`${timezone}`).format('HH:mm:ss')}</p>
  </div>
  `
}).join('');

modalMenu.innerHTML = html;