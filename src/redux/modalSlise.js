import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showAddChan: false,
    showRemChan: false,
    showRenameChan: false,
    showAlarm: false,
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
    switchAlarm: (state) => {
      state.showAlarm = !state.showAlarm;
    },
  },
});

export const {
  switchAddChan,
  switchRemoveChan,
  switchRenameChan,
  switchAlarm,
} = modalSlice.actions;

export const selectShowAddChan = (state) => state.modalReduser.showAddChan;
export const selectShowRemChan = (state) => state.modalReduser.showRemChan;
export const selectShowRenameChan = (state) => state.modalReduser.showRenameChan;
export const selectShowAlarm = (state) => state.modalReduser.showAlarm;

export default modalSlice.reducer;
