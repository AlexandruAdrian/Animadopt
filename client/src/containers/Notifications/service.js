import axios from 'axios';
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}`;

const config = {
  headers: {
    Authorization: `Bearer ${getLocalStorageItem('token')}`,
  },
};

export const getNotificationsHttp = () =>
  axios.get(`${API_ENDPOINT}/notifications`, config);

export const markNotificationHttp = ({ notificationId }) =>
  axios.put(`${API_ENDPOINT}/notifications/seen/${notificationId}`, {}, config);
