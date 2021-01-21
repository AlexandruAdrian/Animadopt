// System
import axios from 'axios';
// Utils
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}/users`;

export const getUserHttp = () =>
  axios.get(`${API_ENDPOINT}`, {
    headers: {
      Authorization: `Bearer ${getLocalStorageItem('token')}`,
    },
  });
