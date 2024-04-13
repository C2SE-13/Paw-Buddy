import axios from '../config/axios';
import {FormData as IPet} from '../screens/pet/AddPetProfileScreen.tsx';
import {IParams} from '../utils/interface.ts';

export const apiGetBreeds = (params?: IParams) =>
  axios({
    url: '/breed/',
    method: 'get',
    params,
  });

export const apiCreatePet = (data: IPet) =>
  axios({
    url: '/pets/create-pet',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const apiGetPetServices = (params?: IParams) =>
  axios({
    url: '/service/get-all-service',
    method: 'get',
    params,
  });

export const apiGetServiceCategories = () =>
  axios({
    url: '/serviceCategory/all',
    method: 'get',
  });
