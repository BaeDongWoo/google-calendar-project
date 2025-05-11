import { configureStore } from '@reduxjs/toolkit';
import calendarReduser from './calendar';
export const store = configureStore({
  reducer: {
    calendar: calendarReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
