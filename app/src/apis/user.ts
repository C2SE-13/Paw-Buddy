import axios from '../config/axios';

export const apiGetCurrent = () =>
  axios({
    url: '/users/get-me',
    method: 'get',
  });

export const apiUpdateCurrent = (data: any) =>
  axios({
    url: '/users/update-me',
    method: 'put',
    data,
  });

export const apiGetDoctors = (params?: any) =>
  axios({
    url: '/users/all',
    method: 'get',
    params,
  });

export const apiGetDetailDoctors = (id: number, params?: any) =>
  axios({
    url: '/users/detail/' + id,
    method: 'get',
    params,
  });
