import axios from '../config/axios';
import {FormData} from '../screens/auth/SignUpScreen';

export const apiRegister = (data: FormData) =>
  axios({
    url: '/auth/register',
    method: 'post',
    data,
  });

export const apiLogin = (data: FormData) =>
  axios({
    url: '/auth/login',
    method: 'post',
    data,
  });
