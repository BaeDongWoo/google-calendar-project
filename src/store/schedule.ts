import { createSlice } from '@reduxjs/toolkit';
import { ScheduleType } from '../interface';

const initialState: { [key: string]: Array<ScheduleType> } = {
  '1996-04-17': [
    {
      title: '생일',
      startHour: 0,
      startMin: '00',
      endHour: 23,
      endMin: '45',
    },
  ],
};

export const calendarSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSchedule: (state, action) => {
      if (!state[action.payload.date]) {
        state[action.payload.date] = [];
      }
      state[action.payload.date] = [
        ...state[action.payload.date],
        action.payload.data,
      ];
    },
    remove: (state, action) => {
      state[action.payload.date] = state[action.payload.date].filter(
        (_, index) => action.payload.index !== index
      );
    },
  },
});
export const { setSchedule, remove } = calendarSlice.actions;
export default calendarSlice.reducer;
