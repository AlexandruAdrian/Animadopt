// System
import axios from 'axios';
// Helpers
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}`;

export const getUsersHttp = ({ page, searchTerm, role }) => {
  return axios.get(`${API_ENDPOINT}/admin/users`, {
    headers: {
      Authorization: `Bearer ${getLocalStorageItem('token')}`,
    },
    params: {
      page,
      searchTerm,
      role,
    },
  });
};

export const getUserPostsHttp = ({ queryParams }) =>
  axios.get(`${API_ENDPOINT}/posts/p/user`, {
    headers: {
      Authorization: `Bearer ${getLocalStorageItem('token')}`,
    },
    params: {
      ...queryParams,
    },
  });
