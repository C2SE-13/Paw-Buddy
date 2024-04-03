import axios from '../config/axios';
import {FormData as IPet} from '../screens/pet/AddPetProfileScreen.tsx';

export const apiGetBreeds = (params: any) =>
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
