import axios from '../config/axios';
import {Booking} from '../screens/pet/BookDateScreen';

export const apiCreateBooking = (data: Booking) =>
  axios({
    url: '/booking/',
    method: 'post',
    data,
  });

export const apiGetBookingUser = (params: any) =>
  axios({
    url: '/booking/detail',
    method: 'get',
    params,
  });

export const apiGetDetailBooking = (id: number) =>
  axios({
    url: '/booking/detail/' + id,
    method: 'get',
  });

export const apiCancelBooking = (id: number) =>
  axios({
    url: '/booking/cancel-booking/' + id,
    method: 'delete',
  });
