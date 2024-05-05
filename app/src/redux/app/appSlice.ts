import {IServieCategories} from './../../utils/interface';
import {createSlice} from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export interface AppState {
  isLoading: boolean;
  serviceCategories: IServieCategories[];
}

const initialState: AppState = {
  isLoading: false,
  serviceCategories: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.isLoading = action.payload;
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
export const {updateLoading} = appSlice.actions;

export default appSlice.reducer;
