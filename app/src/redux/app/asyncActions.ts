import {createAsyncThunk} from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getPetServices = createAsyncThunk(
  'app/petServices',
  async (data, {rejectWithValue}) => {
    const response: any = await apis.apiGetPetServices();

    if (!response.success) {
      return rejectWithValue(response);
    }

    return response.data;
  },
);
