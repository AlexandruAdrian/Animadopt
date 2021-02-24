// Constants
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_LOCATIONS,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
  SET_SELECTED_POST,
  FETCH_DASHBOARD_POSTS,
  FETCH_DASHBOARD_POSTS_SUCCESS,
  FETCH_DASHBOARD_POSTS_ERROR,
  RESET_DASHBOARD,
} from './constants';

export function getUser() {
  return {
    type: GET_USER,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user,
  };
}

export function getUserError() {
  return {
    type: GET_USER_ERROR,
  };
}

export function getLocations() {
  return {
    type: GET_LOCATIONS,
  };
}

export function getLocationsSuccess(locations) {
  return {
    type: GET_LOCATIONS_SUCCESS,
    locations,
  };
}

export function getLocationsError() {
  return {
    type: GET_LOCATIONS_ERROR,
  };
}

export function setSelectedPost(post) {
  return {
    type: SET_SELECTED_POST,
    post,
  };
}

export function fetchDashboardPosts(queryParams) {
  return {
    type: FETCH_DASHBOARD_POSTS,
    queryParams,
  };
}

export function fetchDashboardPostsSuccess(posts) {
  return {
    type: FETCH_DASHBOARD_POSTS_SUCCESS,
    posts,
  };
}

export function fetchDashboardPostsError() {
  return {
    type: FETCH_DASHBOARD_POSTS_ERROR,
  };
}

export function resetDashboard() {
  return {
    type: RESET_DASHBOARD,
  };
}
