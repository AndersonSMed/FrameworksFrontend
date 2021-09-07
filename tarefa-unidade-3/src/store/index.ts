import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './slices/adminSlice';
import homeSlice from './slices/homeSlice';

const store = configureStore({
  reducer: { admin: adminSlice, home: homeSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
