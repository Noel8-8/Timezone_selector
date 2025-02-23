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
let timezoneShown = dayjs.tz.guess()

timezoneElement.innerHTML = timezoneShown;
time.innerHTML = now.format('HH:mm:ss');
date.innerHTML = `${now.format('dddd, D MMMM, YYYY')}`;


setInterval(() => {
  now = dayjs().tz(timezoneShown)
  timezoneElement.innerHTML = timezoneShown;
  time.innerHTML = now.format('HH:mm:ss');
  date.innerHTML = `${now.format('dddd, D MMMM, YYYY')}`;
}, 1000);

// adding the menu items
const timezones = moment.tz.names();
const modalMenu = document.querySelector('.modalMenu');


let html = timezones.map((timezone) => {
  return`
  <div class="item" data-micromodal-close>
    <h2 class="timezoneModal">${timezone}</h2>
    <p>${now.tz(`${timezone}`).format('HH:mm:ss')}</p>
  </div>
  `
}).join('');

modalMenu.innerHTML = html;


// sorting modal animations
function handleTimezoneClick(item){
  const timezoneBold = item.querySelector('.timezoneModal').innerHTML;
  const timezone = timezoneBold.replace(/<span[^>]*>(.*?)<\/span>/gi, "$1");

  timezoneShown = timezone;
}

modalMenu.addEventListener('click', (e)=>{
  if(e.target.closest('.item')){
    const item = e.target.closest('.item');
    handleTimezoneClick(item)
  }
})

const searchBox = document.querySelector('.searchBox');

function handleSearch(){
  if(this.value){
    html = timezones.filter((timezone) => {
      if(timezone.toLowerCase().includes(searchBox.value.toLowerCase())){
        return timezone;
      }
    })
    .map((timezone)=>{
      const highlight = this.value
      let regex = new RegExp(highlight, "gi");
      const boldedTimezone = timezone.replace(regex,
         `<span style="font-weight: 600;" data-micromodal-close>$&</span>`
      )

      return `
      <div class="item" data-micromodal-close>
        <h2 class="timezoneModal">${boldedTimezone}</h2>
        <p>${now.tz(`${timezone}`).format('HH:mm:ss')}</p>
      </div>
      `
    }).join('')
    modalMenu.innerHTML = html;
    modalMenu.classList.remove('hidden')
    
  }else{
    modalMenu.classList.add('hidden')
  }
  
}

searchBox.addEventListener('input', handleSearch)

// handling search icon click
const searchIcon = document.querySelector('.searchIcon');
searchIcon.addEventListener('click',()=>{
  console.log('item click')
  searchBox.focus()
} )


