// System
import { combineReducers } from 'redux';
// Reducers
import requestReducer from '../utils/request/requestReducer';
import dashboardReducer from '../containers/Dashboard/reducer';
import usersReducer from '../containers/Users/reducer';
import categoriesReducer from '../containers/Categories/reducer';
import countiesReducer from '../containers/AddPost/reducer';
import userPostsReducer from '../containers/PostsPage/reducer';
import reviewPostsReducer from '../containers/ReviewsPage/reducer';

const rootReducer = combineReducers({
  request: requestReducer,
  dashboard: dashboardReducer,
  users: usersReducer,
  categories: categoriesReducer,
  counties: countiesReducer,
  userPosts: userPostsReducer,
  reviewPosts: reviewPostsReducer,
});

export default rootReducer;
