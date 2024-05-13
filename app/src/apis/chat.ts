import axios from '../config/axios';

export const apiGetConversations = () =>
  axios({
    url: '/message/conversations',
    method: 'get',
  });

export const apiGetDetailMessages = (id: string) =>
  axios({
    url: '/message/' + id,
    method: 'get',
  });

export const apiSendMessage = (id: string, data: {message: string}) =>
  axios({
    url: '/message/send/' + id,
    method: 'post',
    data,
  });
