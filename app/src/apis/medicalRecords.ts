import axios from '../config/axios';

export const apiGetRecords = (params: any) =>
  axios({
    url: '/medicalRecord/get-records-of-user',
    method: 'get',
    params,
  });
