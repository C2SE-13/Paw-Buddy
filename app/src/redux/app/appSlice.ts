import {IServieCategories} from './../../utils/interface';
import {createSlice} from '@reduxjs/toolkit';
import * as actions from './asyncActions';
import {Socket} from 'socket.io-client';

export interface AppState {
  isLoading: boolean;
  serviceCategories: IServieCategories[];
  usersOnline: string[];
  socket: Socket | null;
}

const initialState: AppState = {
  isLoading: false,
  serviceCategories: [],
  usersOnline: [],
  socket: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateUsersOnline: (state, action) => {
      state.usersOnline = action.payload;
    },
    updateSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(actions.getPetServices.fulfilled, (state, action) => {
      state.serviceCategories = action.payload;
    });

    builder.addCase(actions.getPetServices.rejected, (state, action) => {
      state.serviceCategories = [];
    });
  },
});

// Action creators are generated for each case reducer function;
export const {updateLoading, updateUsersOnline, updateSocket} =
  appSlice.actions;

export default appSlice.reducer;
