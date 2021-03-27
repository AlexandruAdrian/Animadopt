// System
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// Icons
import MenuIcon from '@material-ui/icons/Menu';
// Components
import NotificationsBell from '../containers/Notifications';
import SideMenu from './SideMenu';
// Style
import style from '../styles/NavbarStyle';
// Utils
import { has } from 'lodash';

function Navbar({ user }) {
  const classes = makeStyles(style)();
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuIcon = () => setOpenMenu(true);
  const handleDrawerClose = () => setOpenMenu(false);

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
          <NotificationsBell />
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
