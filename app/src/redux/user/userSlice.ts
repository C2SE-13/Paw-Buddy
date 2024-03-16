import {createSlice} from '@reduxjs/toolkit';

export interface UserState {
  token: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  token: '',
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
