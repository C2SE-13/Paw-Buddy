import {createSlice} from '@reduxjs/toolkit';

export interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function;

export const {updateLoading} = appSlice.actions;

export default appSlice.reducer;
