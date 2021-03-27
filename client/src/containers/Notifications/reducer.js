import {
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_ERROR,
  MARK_NOTIFICATION_SUCCESS,
} from './constants';

const INITIAL_STATE = {
  notifications: [],
};

const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        notifications: action.notifications,
      };
    case MARK_NOTIFICATION_SUCCESS:
      const newNotifications = action.notifications.map((notification) => {
        if (notification._id === action.notification._id) {
          return action.notification;
        }

        return notification;
      });
      return {
        notifications: newNotifications,
      };

    default:
      return state;
  }
};

export default notificationsReducer;
