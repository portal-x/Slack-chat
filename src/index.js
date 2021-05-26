// @ts-check

import init from './init.jsx';

// import 'core-js/stable/index.js';
// import 'regenerator-runtime/runtime.js';

// import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init();
