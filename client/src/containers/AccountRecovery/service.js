// System
import axios from 'axios';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}/users`;

export const requestConfirmationHttp = (email) =>
  axios.post(`${API_ENDPOINT}/request-confirmation`, { email });

export const requestPasswordResetHttp = (email) =>
  axios.post(`${API_ENDPOINT}/request-password-reset`, { email });
