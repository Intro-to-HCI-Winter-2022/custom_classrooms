// es6 import
import $ from 'jquery';

import './style.scss';

$('#main').html('Here we go!');

// counter for seconds passed
let num = 0;
setInterval(() => {
  num += 1;
  $('#main').html(`You've been on this page for ${num} seconds.`);
}, 1000);
