// Constants
import {
  GET_REVIEW_POSTS,
  GET_REVIEW_POSTS_SUCCESS,
  GET_REVIEW_POSTS_ERROR,
  SET_NEXT_POSTS_PAGE,
} from './constants';
// Utils
import { get } from 'lodash';

const INITIAL_STATE = {
  posts: [],
  isLoading: false,
  nextPostsPage: 0,
};

const reviewPostsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REVIEW_POSTS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_REVIEW_POSTS_SUCCESS:
      let newPosts = [];
      if (get(action, 'data.previous')) {
        newPosts = [...state.posts, ...action.data.results];
      } else {
        newPosts = action.data.results;
      }

      return {
        ...state,
        posts: newPosts,
        isLoading: false,
      };

    case GET_REVIEW_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case SET_NEXT_POSTS_PAGE:
      return {
        ...state,
        nextPostsPage: action.nextPage,
      };

    default:
      return state;
  }
};

export default reviewPostsReducer;
