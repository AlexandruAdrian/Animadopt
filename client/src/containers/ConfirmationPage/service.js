// System
import axios from 'axios';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}/users`;

export const confirmAccountHttp = (code) =>
  axios.put(`${API_ENDPOINT}/confirm/${code}`);
