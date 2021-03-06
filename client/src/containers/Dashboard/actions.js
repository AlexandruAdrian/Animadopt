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
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_ERROR,
  RESET_DASHBOARD,
  MARK_NOTIFICATION,
  MARK_NOTIFICATION_SUCCESS,
  MARK_NOTIFICATION_ERROR,
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

export function fetchNotifications() {
  return {
    type: FETCH_NOTIFICATIONS,
  };
}

export function fetchNotificationsSuccess(notifications) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    notifications,
  };
}

export function fetchNotificationsError() {
  return {
    type: FETCH_NOTIFICATIONS_ERROR,
  };
}

export function markNotification(notificationId) {
  return {
    type: MARK_NOTIFICATION,
    notificationId,
  };
}

export function markNotificationSuccess(notification) {
  return {
    type: MARK_NOTIFICATION_SUCCESS,
    notification,
  };
}

export function markNotificationError() {
  return {
    type: MARK_NOTIFICATION_ERROR,
  };
}
