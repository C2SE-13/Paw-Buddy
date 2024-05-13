/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';
import * as actions from './asyncActions';
import {IPet, IUser} from '../../utils/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserState {
  token: string | null;
  isLoggedIn: boolean;
  current: IUser | null;
  petActive: IPet | null;
  isLoading: boolean;
  refreshToken: string | null;
}

const initialState: UserState = {
  token: null,
  isLoggedIn: false,
  current: null,
  petActive: null,
  isLoading: false,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.token = null;
      state.current = null;
      state.refreshToken = null;
    },
    setPet: (state, action) => {
      state.petActive = action.payload.petActive;
    },
  },
  extraReducers: builder => {
    builder.addCase(actions.getCurrent.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
      state.petActive =
        action.payload.petData.length > 0 ? action.payload.petData[0] : null;
    });

    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.token = null;
      state.current = null;
      state.refreshToken = null;
    });
  },
});

// Action creators are generated for each case reducer function
export const {login, logout, setPet} = userSlice.actions;

export default userSlice.reducer;
