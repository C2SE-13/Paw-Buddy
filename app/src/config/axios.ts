import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.interceptors.request.use(
  async function (config) {
    let localStorageData = await AsyncStorage.getItem('persist:app/user');
    if (localStorageData && typeof localStorageData === 'string') {
      const accessToken = JSON.parse(localStorageData)?.token;
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
  function (error) {
    return error.response.data;
  },
);

export default instance;
