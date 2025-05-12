import { createSlice } from '@reduxjs/toolkit';
import { InputModalType } from '../interface';

const initialState: InputModalType = {
  showModal: false,
  startTime: 0,
  startMin: '00',
  endTime: 1,
  endMin: '00',
};

export const inputModalSlice = createSlice({
  name: 'inputModal',
  initialState,
  reducers: {
    setShowModal: (state: InputModalType, action) => {
      state.showModal = action.payload;
    },
    setStartTime: (state: InputModalType, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state: InputModalType, action) => {
      state.endTime = action.payload;
    },
    setStartMin: (state: InputModalType, action) => {
      state.startMin = action.payload;
    },
    setEndMin: (state: InputModalType, action) => {
      state.endMin = action.payload;
    },
  },
});
export const {
  setStartTime,
  setEndTime,
  setShowModal,
  setStartMin,
  setEndMin,
} = inputModalSlice.actions;
export default inputModalSlice.reducer;
