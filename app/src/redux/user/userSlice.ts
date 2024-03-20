/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export interface UserState {
  token: string | null;
  isLoggedIn: boolean;
  current: any[] | null;
}

const initialState: UserState = {
  token: null,
  isLoggedIn: false,
  current: null,
};

export const appSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.accessToken;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.token = null;
      state.current = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(actions.getCurrent.pending, state => {});

    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.current = action.payload.rows;
    });

    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.current = null;
    });
  },
});

// Action creators are generated for each case reducer function
export const {login, logout} = appSlice.actions;

export default appSlice.reducer;
