import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initChat = createAsyncThunk('chat/initChat', async (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get('/api/v1/data', { headers });

  return response.data;
});

export const slice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    currentChannelID: null,
    messages: [],
    initStatus: null,
  },
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels
        .filter(({ id }) => id !== payload);
      state.messages = state.messages
        .filter(({ chanalId }) => chanalId !== payload);
    },
    renameChannel: (state, { payload }) => {
      const { id: currId, newName } = payload;
      const currentChan = state.channels.find(({ id }) => id === currId);
      currentChan.name = newName;
    },
    setCurrentChanelId: (state, { payload }) => {
      state.currentChannelID = payload;
    },
    addMessages: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: {
    [initChat.pending]: (state) => {
      state.initStatus = 'loading';
    },
    [initChat.fulfilled]: (state, { payload }) => {
      const { channels, messages, currentChannelId } = payload;
      state.channels = channels;
      state.messages = messages;
      state.currentChannelID = currentChannelId;
      state.initStatus = 'success';
    },
    [initChat.rejected]: (state) => {
      state.initStatus = 'failed';
    },
  },
});

export const {
  addChannel,
  setCurrentChanelId,
  addMessages,
  removeChannel,
  renameChannel,
} = slice.actions;

export const selectChannels = (state) => state.chatReduser.channels;
export const selectMssages = (state) => state.chatReduser.messages;
export const selectCurrentChannelID = (state) => state.chatReduser.currentChannelID;
export const selectInitStatus = (state) => state.chatReduser.initStatus;

export default slice.reducer;
