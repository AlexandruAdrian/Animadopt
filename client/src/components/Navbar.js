// System
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
// Components
import Notifications from './Notifications';
import SideMenu from './SideMenu';
// Actions
import { fetchNotifications } from '../containers/Dashboard/actions';
// Style
import style from '../styles/NavbarStyle';
// Utils
import { has } from 'lodash';

function Navbar({ user }) {
  const classes = makeStyles(style)();
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.dashboard);
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  const handleMenuIcon = () => setOpenMenu(true);
  const handleDrawerClose = () => setOpenMenu(false);

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

  const FETCH_INTERVAL = 10000; // 100 sec
  useEffect(() => {
    const getNotifications = setInterval(
      () => dispatch(fetchNotifications()),
      FETCH_INTERVAL
    );

    return () => clearInterval(getNotifications);
  }, [dispatch]);

  return (
    <Box className={classes.navbar}>
      <Grid container className={classes.grid}>
        <Grid item xs={2} className={classes.menu}>
          <MenuIcon onClick={handleMenuIcon} fontSize="small" />
        </Grid>

        <Grid item xs={8} className={classes.logoWrapper}>
          <Box className={classes.logo} />
        </Grid>

        <Grid container item xs={2} className={classes.user}>
          <Grid item xs={5} sm={9} md={11} className={classes.userDetails}>
            {has(user, 'avatar') && (
              <img
                alt="avatar"
                src={`${process.env.REACT_APP_API_ENDPOINT}/${user.avatar}`}
              />
            )}
            {has(user, 'firstName') && (
              <Typography component="p">{user.firstName}</Typography>
            )}
          </Grid>
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
            {openNotifications && notifications.length > 0 && (
              <Notifications
                notifications={notifications}
                isOpen={openNotifications}
                openNotifications={setOpenNotifications}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <SideMenu open={openMenu} onClose={handleDrawerClose} user={user} />
    </Box>
  );
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Navbar;
