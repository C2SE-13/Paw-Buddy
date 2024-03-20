import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from './env';

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
    config.headers.Accept = 'application/json';
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
  function (error) {
    return error.response;
  },
);

export default instance;
