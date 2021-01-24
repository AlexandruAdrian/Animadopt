// System
import axios from 'axios';
// Helpers
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}/admin`;

export const getUsersHttp = ({ page, searchTerm, role }) => {
  return axios.get(`${API_ENDPOINT}/users`, {
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

export const banUserHttp = ({ startTime, endTime, reason, userId }) => {
  return axios.put(
    `${API_ENDPOINT}/ban/${userId}`,
    {
      startTime,
      endTime,
      reason,
    },
    {
      headers: {
        Authorization: `Bearer ${getLocalStorageItem('token')}`,
      },
    }
  );
};
