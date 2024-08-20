import { configureStore } from '@reduxjs/toolkit';
import attendanceReducer from './Slices/attendanceSlice';
import holidaysReducer from './Slices/holidaysSlice';

export const store = configureStore({
  reducer: {
    attendance: attendanceReducer,
    holidays: holidaysReducer,
  },
});