// es6 import
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

// React Test
const App = () => <div className="test">All the REACT are belong to us!</div>;

ReactDOM.render(<App />, document.getElementById('main'));

// counter for seconds passed
let num = 0;
setInterval(() => {
  num += 1;
  $('#main').html(`You've been on this page for ${num} seconds.`);
}, 1000);
