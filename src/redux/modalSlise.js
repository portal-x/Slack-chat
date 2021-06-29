import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showAddChan: false,
  },
  reducers: {
    switchAddChan: (state) => {
      state.showAddChan = !state.showAddChan;
    },
  },
});

export const { switchAddChan } = modalSlice.actions;

export const selectShowAddChan = (state) => state.modalReduser.showAddChan;

export default modalSlice.reducer;
