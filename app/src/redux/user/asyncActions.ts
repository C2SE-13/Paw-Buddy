import {createAsyncThunk} from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getCurrent = createAsyncThunk(
  'user/current',
  async (data, {rejectWithValue}) => {
    const response: any = await apis.apiGetCurrent();

    if (!response.success) {
      return rejectWithValue(response);
    }

    return response.data;
  },
);

export const getNotification = createAsyncThunk(
  'user/notification',
  async (data, {rejectWithValue}) => {
    const response: any = await apis.apiGetNotification();

    if (!response.success) {
      return rejectWithValue(response);
    }

    return response.data;
  },
);
