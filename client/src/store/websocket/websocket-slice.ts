import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as WebSocket from 'websocket';

const initialState = {};

export const webSocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setConnection: (state, action: PayloadAction<WebSocket.w3cwebsocket>) => {
      state = action.payload;
    },
  },
});

export const webSocketActions = webSocketSlice.actions;

export default webSocketSlice;
