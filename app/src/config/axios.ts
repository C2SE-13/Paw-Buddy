/* eslint-disable dot-notation */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from './env';
import {apiRefreshToken} from '../apis';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  async function (config) {
    let localStorageData = await AsyncStorage.getItem('persist:app/user');
    if (localStorageData && typeof localStorageData === 'string') {
      const accessToken = JSON.parse(localStorageData)?.token.replaceAll(
        '"',
        '',
      );
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 403) {
      const localStorageData = await AsyncStorage.getItem('persist:app/user');
      if (localStorageData && typeof localStorageData === 'string') {
        const refreshToken = JSON.parse(
          localStorageData,
        )?.refreshToken.replaceAll('"', '');
        const response: any = await apiRefreshToken({
          refresh_token: refreshToken,
        });
        if (response.success) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.token}`;
        }
      }
      return instance(originalRequest);
    }
    return error.response.data;
  },
);

export default instance;
