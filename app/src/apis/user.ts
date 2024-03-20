import axios from '../config/axios';

export const apiGetCurrent = () =>
  axios({
    url: '/users/get-me',
    method: 'get',
  });
