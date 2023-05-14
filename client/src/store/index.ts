import { configureStore } from '@reduxjs/toolkit';
import socketSlice from './socket/socket-slice';

export const store = configureStore({
  reducer: {
    socket: socketSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
