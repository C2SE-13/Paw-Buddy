import {createSlice} from '@reduxjs/toolkit';

export interface UserState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  token: null,
  isLoggedIn: false,
};

export const appSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = appSlice.actions;

export default appSlice.reducer;
