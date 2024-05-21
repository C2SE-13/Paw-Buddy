import {IServieCategories} from './../../utils/interface';
import {createSlice} from '@reduxjs/toolkit';
import * as actions from './asyncActions';
import {Socket} from 'socket.io-client';

export interface AppState {
  isLoading: boolean;
  serviceCategories: IServieCategories[];
  usersOnline: string[];
  socket: Socket | null;
  newNotification: boolean;
  messNtofication: string;
}

const initialState: AppState = {
  isLoading: false,
  serviceCategories: [],
  usersOnline: [],
  socket: null,
  newNotification: false,
  messNtofication: '',
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
    updateNotification: (state, action) => {
      state.newNotification = action.payload.state;
      state.messNtofication = action.payload.mess;
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
export const {
  updateLoading,
  updateUsersOnline,
  updateSocket,
  updateNotification,
} = appSlice.actions;

export default appSlice.reducer;
