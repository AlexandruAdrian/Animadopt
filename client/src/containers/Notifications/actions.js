import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_ERROR,
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_NOTIFICATION,
  MARK_NOTIFICATION_ERROR,
  MARK_NOTIFICATION_SUCCESS,
} from './constants';

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
