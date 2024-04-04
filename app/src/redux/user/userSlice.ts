/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';
import * as actions from './asyncActions';
import {IPet, IUser} from '../../utils/interface';

export interface UserState {
  token: string | null;
  isLoggedIn: boolean;
  current: IUser[] | null;
  petActive: IPet | null;
}

const initialState: UserState = {
  token: null,
  isLoggedIn: false,
  current: null,
  petActive: null,
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
    setPet: (state, action) => {
      state.petActive = action.payload.petActive;
    },
  },
  extraReducers: builder => {
    builder.addCase(actions.getCurrent.pending, state => {});

    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.current = action.payload.rows;
      state.petActive = action.payload.rows[0].petData[0];
    });

    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.current = null;
    });
  },
});

// Action creators are generated for each case reducer function
export const {login, logout, setPet} = appSlice.actions;

export default appSlice.reducer;
