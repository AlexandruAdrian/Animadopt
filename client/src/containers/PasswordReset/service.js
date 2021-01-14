// System
import axios from 'axios';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}/users`;

export const resetPasswordHttp = ({
  newPassword,
  passwordConfirmation,
  code,
}) =>
  axios.post(`${API_ENDPOINT}/password-reset/${code}`, {
    newPassword,
    passwordConfirmation,
  });
