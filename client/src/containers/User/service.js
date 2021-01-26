// System
import axios from 'axios';
// Utils
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}`;

export const getUserForAdminHttp = ({ userId }) =>
  axios.get(`${API_ENDPOINT}/admin/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${getLocalStorageItem('token')}`,
    },
  });

export const banUserHttp = ({ startTime, endTime, reason, userId }) => {
  return axios.put(
    `${API_ENDPOINT}/admin/ban/${userId}`,
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
    `${API_ENDPOINT}/admin/unban/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getLocalStorageItem('token')}`,
      },
    }
  );

export const promoteUserHttp = ({ userId }) =>
  axios.put(
    `${API_ENDPOINT}/owner/promote/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getLocalStorageItem('token')}`,
      },
    }
  );

export const demoteUserHttp = ({ userId }) =>
  axios.put(
    `${API_ENDPOINT}/owner/demote/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getLocalStorageItem('token')}`,
      },
    }
  );
