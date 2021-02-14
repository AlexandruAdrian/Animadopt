// Constants
import {
  FETCH_USER_POSTS,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_ERROR,
} from './constants';

const INITIAL_STATE = {
  posts: [],
  isLoading: false,
};

const userPostsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_POSTS:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USER_POSTS_SUCCESS:
      return {
        posts: action.posts,
        isLoading: false,
      };

    case FETCH_USER_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default userPostsReducer;
