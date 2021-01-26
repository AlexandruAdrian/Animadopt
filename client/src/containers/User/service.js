// System
import axios from 'axios';
// Utils
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}/admin`;

export const getUserForAdminHttp = ({ userId }) =>
  axios.get(`${API_ENDPOINT}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${getLocalStorageItem('token')}`,
    },
  });

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

export const unbanUserHttp = ({ userId }) =>
  axios.put(
    `${API_ENDPOINT}/unban/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getLocalStorageItem('token')}`,
      },
    }
  );
