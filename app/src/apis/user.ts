import axios from '../config/axios';

export const apiGetCurrent = () =>
  axios({
    url: '/users/get-me',
    method: 'get',
  });

  export const apiUpdateCurrent = (data:any) =>
  axios({
    url: '/users/update-me',
    method: 'put',
    data
  });
