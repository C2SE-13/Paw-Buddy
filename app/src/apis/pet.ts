import axios from '../config/axios';

export const apiGetBreeds = (params: any) =>
  axios({
    url: '/breed/breed',
    method: 'get',
    params,
  });
