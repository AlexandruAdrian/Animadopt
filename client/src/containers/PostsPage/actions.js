// Constants
import {
  FETCH_USER_POSTS,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_ERROR,
} from './constants';
// Toastify
import { toast } from 'react-toastify';

export function fetchUserPosts(queryParams) {
  return {
    type: FETCH_USER_POSTS,
    queryParams,
  };
}

export function fetchUserPostsSuccess(posts) {
  return {
    type: FETCH_USER_POSTS_SUCCESS,
    posts,
  };
}

export function fetchUserPostsError() {
  toast.error(
    'Ooops! Am intampinat o eroare in preluarea anunturilor dumneavoastra, va rugam incercati din nou mai tarziu'
  );
  return {
    type: FETCH_USER_POSTS_ERROR,
  };
}
