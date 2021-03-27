// System
import axios from 'axios';
// Utils
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}`;

const config = {
  headers: {
    Authorization: `Bearer ${getLocalStorageItem('token')}`,
  },
};

export const getUserHttp = () => axios.get(`${API_ENDPOINT}/users`, config);

export const getLocationsHttp = () =>
  axios.get(`${API_ENDPOINT}/locations`, config);

export const getDashboardPostsHttp = ({ queryParams }) =>
  axios.get(`${API_ENDPOINT}/posts`, {
    ...config,
    params: {
      ...queryParams,
    },
  });
