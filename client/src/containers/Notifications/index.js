import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
// Components
import Notifications from '../../components/Notifications';
// Actions
import { fetchNotifications } from './actions';
// Styles
import styles from '../../styles/NotificationsBell';

export default function NotificationsBell() {
  const classes = makeStyles(styles)();
  const [openNotifications, setOpenNotifications] = useState(false);
  const { notifications } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const FETCH_INTERVAL = 10000; // 100 sec
  useEffect(() => {
    dispatch(fetchNotifications());
    const getNotifications = setInterval(
      () => dispatch(fetchNotifications()),
      FETCH_INTERVAL
    );
    return () => clearInterval(getNotifications);
  }, [dispatch]);

  const notificationHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenNotifications(true);
  };

  const getUnseenNotifications = () => {
    const unseen = notifications.filter((notification) => !notification.seen);

    return unseen.length;
  };

  const unseenNotifications = getUnseenNotifications();

  return (
    <Grid
      item
      xs={5}
      sm={2}
      md={1}
      className={classes.notifications}
      onClick={notificationHandler}
    >
      <NotificationsIcon fontSize="small" />
      {unseenNotifications > 0 && (
        <Box className={classes.notificationBubble}>
          <Typography component="p">{unseenNotifications}</Typography>
        </Box>
      )}
      {openNotifications && (
        <Notifications
          notifications={notifications}
          isOpen={openNotifications}
          openNotifications={setOpenNotifications}
        />
      )}
    </Grid>
  );
}
