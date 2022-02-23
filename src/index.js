import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import { ActionTypes } from './actions';
import reducers from './reducers';
import App from './components/app';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

// const store = configureStore({
//  reducer: reducers,
// });

// on page refresh, checking if user was previously signed in
const token = localStorage.getItem('custom_classrooms_token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER });
  store.dispatch({ type: ActionTypes.SET_USER, payload: token });
}

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('main'),
);
