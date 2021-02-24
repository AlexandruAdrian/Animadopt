// Constants
import {
  GET_REVIEW_POSTS,
  GET_REVIEW_POSTS_SUCCESS,
  GET_REVIEW_POSTS_ERROR,
} from './constants';
import { toast } from 'react-toastify';

export function getReviewPosts(queryParams) {
  return {
    type: GET_REVIEW_POSTS,
    queryParams,
  };
}

export function getReviewPostsSuccess(posts) {
  return {
    type: GET_REVIEW_POSTS_SUCCESS,
    posts,
  };
}

export function getReviewPostsError() {
  toast.error('Ooops! Am intampinat o eroare in preluarea anunturilor');
  return {
    type: GET_REVIEW_POSTS_ERROR,
  };
}
