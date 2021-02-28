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

export const getUserForAdminHttp = ({ userId }) =>
  axios.get(`${API_ENDPOINT}/admin/user/${userId}`, config);

export const banUserHttp = ({ startTime, endTime, reason, userId }) => {
  return axios.put(
    `${API_ENDPOINT}/admin/ban/${userId}`,
    {
      startTime,
      endTime,
      reason,
    },
    config
  );
};

export const unbanUserHttp = ({ userId }) =>
  axios.put(`${API_ENDPOINT}/admin/unban/${userId}`, {}, config);

export const promoteUserHttp = ({ userId }) =>
  axios.put(`${API_ENDPOINT}/owner/promote/${userId}`, {}, config);

export const demoteUserHttp = ({ userId }) =>
  axios.put(`${API_ENDPOINT}/owner/demote/${userId}`, {}, config);

export const getUserBanHistoryHttp = ({ userId }) =>
  axios.get(`${API_ENDPOINT}/admin/user/history/${userId}`, config);
