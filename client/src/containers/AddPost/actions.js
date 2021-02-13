import {
  FETCH_COUNTIES,
  FETCH_COUNTIES_SUCCESS,
  FETCH_COUNTIES_ERROR,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
} from './constants';
import { toast } from 'react-toastify';

export function fetchCounties() {
  return {
    type: FETCH_COUNTIES,
  };
}

export function fetchCountiesSuccess(counties) {
  return {
    type: FETCH_COUNTIES_SUCCESS,
    counties,
  };
}

export function fetchCountiesError() {
  toast.error('Ooops! Am intampinat o eroare in preluarea localitatilor');
  return {
    type: FETCH_COUNTIES_ERROR,
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostSuccess(addedPost) {
  return {
    type: ADD_POST_SUCCESS,
    response: addedPost,
  };
}

export function addPostError() {
  toast.error('Ooops! Am intampinat o eroare in salvarea acestui anunt');
  return {
    type: ADD_POST_ERROR,
  };
}
