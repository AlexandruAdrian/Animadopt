import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_ERROR,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  SET_SELECTED_CATEGORY,
} from './constants';
import { toast } from 'react-toastify';

export function fetchCategories() {
  return {
    type: FETCH_CATEGORIES,
  };
}

export function fetchCategoriesSuccess(categories) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    categories,
  };
}

export function fetchCategoriesError() {
  return {
    type: FETCH_CATEGORIES_ERROR,
  };
}

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  };
}

export function addCategorySuccess({ newCategory, message }) {
  toast.success(message);
  return {
    type: ADD_CATEGORY_SUCCESS,
    newCategory,
  };
}

export function addCategoryError() {
  toast.error(
    'Ooops! Am intampinat o eroare in adaugarea categoriei, va rugam incercati din nou mai tarziu'
  );
  return {
    type: ADD_CATEGORY_ERROR,
  };
}

export function updateCategory(category) {
  return {
    type: UPDATE_CATEGORY,
    category,
  };
}

export function updateCategorySuccess({ updatedCategory, message }) {
  toast.success(message);
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    updatedCategory,
  };
}

export function updateCategoryError() {
  toast.error(
    'Ooops! Am intampinat o eroare in actualizarea categoriei, va rugam incercati din nou mai tarziu'
  );
  return {
    type: UPDATE_CATEGORY_ERROR,
  };
}

export function deleteCategory(categoryId) {
  return {
    type: DELETE_CATEGORY,
    categoryId,
  };
}

export function deleteCategorySuccess({ categoryId, message }) {
  toast.success(message);
  return {
    type: DELETE_CATEGORY_SUCCESS,
    categoryId,
  };
}

export function deleteCategoryError() {
  toast.error(
    'Ooops! Am intampinat o eroare in stergerea categoriei, va rugam incercati din nou mai tarziu'
  );
  return {
    type: DELETE_CATEGORY_ERROR,
  };
}

export function setSelectedCategory(category) {
  return {
    type: SET_SELECTED_CATEGORY,
    category,
  };
}
