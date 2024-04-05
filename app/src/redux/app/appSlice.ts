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
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function;

export const {loading} = appSlice.actions;

export default appSlice.reducer;
