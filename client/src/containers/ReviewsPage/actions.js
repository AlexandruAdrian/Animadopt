// Constants
import {
  GET_REVIEW_POSTS,
  GET_REVIEW_POSTS_SUCCESS,
  GET_REVIEW_POSTS_ERROR,
  SET_NEXT_POSTS_PAGE,
} from './constants';
import { toast } from 'react-toastify';

export function getReviewPosts(queryParams) {
  return {
    type: GET_REVIEW_POSTS,
    queryParams,
  };
}

export function getReviewPostsSuccess(data) {
  return {
    type: GET_REVIEW_POSTS_SUCCESS,
    data,
  };
}

export function getReviewPostsError() {
  toast.error('Ooops! Am intampinat o eroare in preluarea anunturilor');
  return {
    type: GET_REVIEW_POSTS_ERROR,
  };
}

export function setNextPostsPage(nextPage) {
  return {
    type: SET_NEXT_POSTS_PAGE,
    nextPage,
  };
}
