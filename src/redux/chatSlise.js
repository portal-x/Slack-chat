import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    currentChannelID: null,
    messages: [],
  },
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    setCurrentChanelId: (state, { payload }) => {
      state.currentChannelID = payload;
    },
    addMessages: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
});

export const { addChannel, setCurrentChanelId, addMessages } = slice.actions;

export const initChat = (token) => async (dispatch) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get('/api/v1/data', { headers });
  const { channels, messages, currentChannelId } = response.data;
  channels.forEach((chanal) => dispatch(addChannel(chanal)));
  messages.forEach((message) => dispatch(addMessages(message)));
  dispatch(setCurrentChanelId(currentChannelId));
};

export const selectChanels = (state) => state.chatReduser.channels;
export const selectMssages = (state) => state.chatReduser.messages;
export const selectCurrentChannelID = (state) => state.chatReduser.currentChannelID;

export default slice.reducer;
