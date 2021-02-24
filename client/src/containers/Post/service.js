// System
import axios from 'axios';
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}`;

const config = {
  headers: {
    Authorization: `Bearer ${getLocalStorageItem('token')}`,
  },
};

export const getPostHttp = (postId) =>
  axios.get(`${API_ENDPOINT}/posts/${postId}`, config);

export const deletePostHttp = (postId) =>
  axios.delete(`${API_ENDPOINT}/posts/${postId}`, config);

export const updatePostStatus = ({ postId, status }) =>
  axios.put(`${API_ENDPOINT}/admin/post/${postId}`, { status }, config);

export const markAsAdopted = ({ postId }) =>
  axios.put(`${API_ENDPOINT}/posts/adopted/${postId}`, {}, config);
