import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showAddChan: false,
    showRemChan: false,
    showRenameChan: false,
    buttStatus: 'show',
  },
  reducers: {
    switchAddChan: (state) => {
      state.showAddChan = !state.showAddChan;
    },
    switchRemoveChan: (state) => {
      state.showRemChan = !state.showRemChan;
    },
    switchRenameChan: (state) => {
      state.showRenameChan = !state.showRenameChan;
    },
    changeButtStatus: (state) => {
      state.buttStatus = !state.buttStatus;
    },
  },
});

export const {
  switchAddChan,
  switchRemoveChan,
  switchRenameChan,
  changeButtStatus,
} = modalSlice.actions;

export const selectShowAddChan = (state) => state.modalReduser.showAddChan;
export const selectShowRemChan = (state) => state.modalReduser.showRemChan;
export const selectShowRenameChan = (state) => state.modalReduser.showRenameChan;
export const selectButtStatus = (state) => state.modalReduser.buttStatus;

export default modalSlice.reducer;
