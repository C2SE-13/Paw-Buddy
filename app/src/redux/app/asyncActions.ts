import {createAsyncThunk} from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getPetServices = createAsyncThunk(
  'app/serviceCategories',
  async (data, {rejectWithValue}) => {
    const response: any = await apis.apiGetServiceCategories();

    if (!response.success) {
      return rejectWithValue(response);
    }

    return response.data;
  },
);
