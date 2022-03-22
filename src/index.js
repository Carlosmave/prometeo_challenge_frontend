import React from 'react'
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import App from './App'
import rootReducer from './slices'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const blacklist = ["account", "client", "creditCard", "login", "profile", "provider", "sidebar", "transferDestination", "transference"]
    const result = next(action);
    const _ = require('lodash');
    const actualState = _.cloneDeep(getState());
    blacklist.forEach(item => delete actualState[item]);
    localStorage.setItem('applicationState', JSON.stringify(actualState));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    return JSON.parse(localStorage.getItem('applicationState'));
  }
};


const store = configureStore({
  reducer: rootReducer,
  preloadedState: reHydrateStore(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
