import { DateTime } from './luxon.js';

export default function getTime() {
  const dt = DateTime.now();
  document.querySelector('.day-time').innerHTML = dt.toFormat('DD, HH:mm:ss');
}

setInterval(() => {
  getTime();
}, 1000);