// @ts-check

// import 'core-js/stable/index.js';
// import 'regenerator-runtime/runtime.js';

// import '../assets/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import store from './redux/store.js';

export default () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#chat'),
  );
};
