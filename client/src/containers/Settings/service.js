// System
import axios from 'axios';
// Helpers
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}/users`;

export const updateUserAvatarHttp = ({ avatar }) =>
  axios.put(`${API_ENDPOINT}/avatar`, avatar, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getLocalStorageItem('token')}`,
    },
  });

export const changeUserPasswordHttp = ({
  oldPassword,
  password,
  passwordConfirmation,
}) =>
  axios.put(
    `${API_ENDPOINT}/change-password`,
    {
      oldPassword,
      newPassword: password,
      passwordConfirmation,
    },
    {
      headers: {
        Authorization: `Bearer ${getLocalStorageItem('token')}`,
      },
    }
  );
