import { configureStore } from '@reduxjs/toolkit';
import chatReduser from './chatSlise.js';
import modalReduser from './modalSlise.js';

export default configureStore({
  reducer: {
    chatReduser,
    modalReduser,
  },
});
