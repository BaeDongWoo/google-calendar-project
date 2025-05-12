import { createSlice } from '@reduxjs/toolkit';
import { calendarType } from '../interface';

const initialState: calendarType = {
  date: new Date(),
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDate: (state: calendarType, action) => {
      state.date = action.payload;
    },
  },
});
export const { setDate } = calendarSlice.actions;
export default calendarSlice.reducer;
