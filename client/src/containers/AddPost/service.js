// System
import axios from 'axios';
// Helpers
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}/posts`;

const config = {
  headers: {
    Authorization: `Bearer ${getLocalStorageItem('token')}`,
  },
};

export const fetchCountiesHttp = () =>
  axios.get(`${API_ENDPOINT}/p/counties`, config);

export const addPostHttp = ({ post }) =>
  axios.post(`${API_ENDPOINT}`, post, {
    headers: {
      ...config.headers,
    },
  });
