import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: null,
  reducers: {
    initializeConnection: (state, action) => {
      return action.payload;
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice;
