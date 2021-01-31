// System
import axios from 'axios';
// Helpers
import { getLocalStorageItem } from '../../helpers/localStorage';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}/categories`;
const ADMIN_API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API}/${process.env.REACT_APP_API_V}/admin/categories`;
const config = {
  headers: {
    Authorization: `Bearer ${getLocalStorageItem('token')}`,
  },
};

export const fetchCategoriesHttp = () => axios.get(API_ENDPOINT, config);

export const addCategoryHttp = ({ category }) =>
  axios.post(ADMIN_API_ENDPOINT, category, config);

export const updateCategoryHttp = ({ category }) =>
  axios.put(`${ADMIN_API_ENDPOINT}/${category._id}`, category, config);

export const deleteCategoryHttp = ({ categoryId }) =>
  axios.delete(`${ADMIN_API_ENDPOINT}/${categoryId}`, config);
