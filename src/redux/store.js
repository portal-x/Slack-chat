import { configureStore } from '@reduxjs/toolkit';
import chatReduser from './chatSlise.js';

export default configureStore({
  reducer: {
    chatReduser,
  },
});
