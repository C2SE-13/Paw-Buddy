import axios from '../config/axios';
import {Booking} from '../screens/pet/BookDateScreen';

export const apiCreateBooking = (data: Booking) =>
  axios({
    url: '/booking/',
    method: 'post',
    data,
  });

export const apiGetBookingUser = params =>
  axios({
    url: '/booking/detail',
    method: 'get',
    params,
  });
