import { DateTime } from './luxon.js';

let getTime;

export default getTime = () => {
  const dateAndTime = DateTime.now();
  document.querySelector('.day-time').innerHTML = dateAndTime.toFormat('DD, HH:mm:ss');
};

setInterval(() => {
  getTime();
}, 1000);