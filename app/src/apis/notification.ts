import axios from '../config/axios';

export const apiGetNotification = () =>
  axios({
    url: '/notification/',
    method: 'get',
  });

export const apiUpdateNotification = () =>
  axios({
    url: '/notification/',
    method: 'put',
  });
