import { configureStore } from '@reduxjs/toolkit';
import { webSocketSlice } from './websocket/websocket-slice';

export const store = configureStore({
  reducer: {
    webSocket: webSocketSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
