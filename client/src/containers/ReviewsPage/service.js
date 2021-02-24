// System
import axios from 'axios';
// Helpers
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}`;

export const getReviewPostsHttp = ({ queryParams }) => {
  return axios.get(`${API_ENDPOINT}/posts`, {
    headers: {
      Authorization: `Bearer ${getLocalStorageItem('token')}`,
    },
    params: {
      ...queryParams,
    },
  });
};
