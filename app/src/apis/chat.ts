import axios from '../config/axios';

export const apiGetConversations = () =>
  axios({
    url: '/message/conversations',
    method: 'get',
  });
