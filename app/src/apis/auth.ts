import axios from '../config/axios';
import {FormData as loginProps} from '../screens/auth/SignInScreen';
import {FormData as registerProps} from '../screens/auth/SignUpScreen';

export const apiRegister = (data: registerProps) =>
  axios({
    url: '/auth/register',
    method: 'post',
    data,
  });

export const apiLogin = (data: loginProps) =>
  axios({
    url: '/auth/login',
    method: 'post',
    data,
  });

export const apiRefreshToken = (data: any) =>
  axios({
    url: '/auth/refresh-token',
    method: 'post',
    data,
  });
