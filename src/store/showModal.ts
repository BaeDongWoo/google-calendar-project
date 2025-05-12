import { createSlice } from '@reduxjs/toolkit';
import { ShowModalType } from '../interface';

const initialState = {
  showModal: null,
};
interface ShowModalState {
  showModal: {
    date: string;
    index: number;
  } | null;
}

export const inputModalSlice = createSlice({
  name: 'showModal',
  initialState,
  reducers: {
    setModal: (state: ShowModalState, action) => {
      state.showModal = action.payload;
    },
  },
});
export const { setModal } = inputModalSlice.actions;
export default inputModalSlice.reducer;
