import { configureStore } from '@reduxjs/toolkit';
import calendarReduser from './calendar';
import inPutModalReduser from './inputModal';
import scheduleReduser from './schedule';
import showModalReducer from './showModal';
export const store = configureStore({
  reducer: {
    calendar: calendarReduser,
    inputModal: inPutModalReduser,
    schedule: scheduleReduser,
    showModal: showModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
