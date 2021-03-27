// System
import React, { useRef, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import moment from 'moment';
// Material UI
import {
  Fade,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
// Icons
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
// Actions
import { setSelectedPost } from '../containers/Dashboard/actions';
import { markNotification } from '../containers/Notifications/actions';
// Constants
import {
  STATUS_APPROVED,
  STATUS_REJECTED,
} from '../containers/PostsPage/constants';
// Styles
import styles from '../styles/Notifications';

function Notifications({ isOpen, notifications, openNotifications }) {
  const classes = makeStyles(styles)();
  const notificationsRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const closeNotifications = useCallback(
    (e) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        openNotifications(false);
      }
    },
    [notificationsRef]
  );

  const handleMouseOver = (notification) => {
    if (!notification.seen) {
      dispatch(markNotification(notification._id));
    }
  };

  const handleNotificationClick = (e, notification) => {
    e.preventDefault();
    e.stopPropagation();
    openNotifications(false);
    dispatch(setSelectedPost(null));
    history.push(`/dashboard/posts/post/${notification.item._id}`);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', closeNotifications);
    }
    return () => {
      document.removeEventListener('click', closeNotifications);
    };
  }, [closeNotifications]);

  return (
    isOpen && (
      <Fade in>
        <Paper
          className={classes.notificationsContainer}
          ref={notificationsRef}
          elevation={9}
        >
          <Typography component={'h3'} variant={'h6'}>
            Notificari
          </Typography>
          <List className={classes.notificationsList}>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <ListItem
                  className={
                    !notification.seen
                      ? `${classes.notificationsItem} ${classes.unseenNotification}`
                      : `${classes.notificationsItem}`
                  }
                  onMouseOver={() => handleMouseOver(notification)}
                  onClick={(e) => handleNotificationClick(e, notification)}
                >
                  <ListItemIcon>
                    {notification.item.status === STATUS_APPROVED ? (
                      <CheckIcon className={classes.approved} />
                    ) : notification.item.status === STATUS_REJECTED ? (
                      <CloseIcon className={classes.rejected} />
                    ) : null}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      notification.item.status === STATUS_APPROVED
                        ? `Anuntul ${notification.item.title} a fost acceptat`
                        : `Anuntul ${notification.item.title} a fost respins`
                    }
                    secondary={moment(notification.createdAt).fromNow()}
                  />
                </ListItem>
              ))
            ) : (
              <Box className={classes.noNotifications}>
                Momentan nu aveti notificari
              </Box>
            )}
          </List>
        </Paper>
      </Fade>
    )
  );
}

Notifications.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
  openNotifications: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  isOpen: false,
};

export default Notifications;
