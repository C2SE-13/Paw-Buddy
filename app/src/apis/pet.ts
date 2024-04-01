import axios from '../config/axios';

export const apiGetBreeds = (params: any) =>
  axios({
    url: '/breed/',
    method: 'get',
    params,
  });
