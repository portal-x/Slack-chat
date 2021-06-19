// @ts-check

// import 'core-js/stable/index.js';
// import 'regenerator-runtime/runtime.js';

// import '../assets/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import store from './redux/store.js';
import { UserProvider } from './UserContext.jsx';

export default () => {
  ReactDOM.render(
    <UserProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserProvider>,
    document.querySelector('#chat'),
  );
};
