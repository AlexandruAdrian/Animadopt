// Constants
import {
  GET_REVIEW_POSTS,
  GET_REVIEW_POSTS_SUCCESS,
  GET_REVIEW_POSTS_ERROR,
} from './constants';

const INITIAL_STATE = {
  posts: [],
  isLoading: false,
};

const reviewPostsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REVIEW_POSTS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_REVIEW_POSTS_SUCCESS:
      return {
        posts: action.posts,
        isLoading: false,
      };

    case GET_REVIEW_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reviewPostsReducer;
