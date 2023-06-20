import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Player } from '../interfaces/Player';

export const userSlice = createSlice({
  name: 'user',
  initialState: {} as Player,
  reducers: {
    setUserState: (state, action: PayloadAction<Player>) => {
      state.identifier = action.payload.identifier;
      state.name = action.payload.name;
      state.isAdmin = action.payload.isAdmin;
    },
    reset: state => {
      Object.assign(state, null);
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
