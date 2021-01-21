// System
import React from 'react';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
// Icons
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import GroupIcon from '@material-ui/icons/Group';
// Constants
import {
  USER_ROLE_ADMIN,
  USER_ROLE_OWNER,
} from '../containers/Dashboard/constants';
// Styles
import styles from '../styles/SideMenu';
// Utils
import { has } from 'lodash';

function SideMenu({ open, onClose, user }) {
  const classes = makeStyles(styles)();
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box className={classes.sideMenu}>
        <List className={classes.optionsContainer}>
          {has(user, 'avatar') && has(user, 'firstName') && (
            <ListItem className={classes.userDetails}>
              <Box className={classes.profile}>
                <img
                  alt="avatar"
                  src={`${process.env.REACT_APP_API_ENDPOINT}/${user.avatar}`}
                />
              </Box>
              <Typography component="p">{user.firstName}</Typography>
            </ListItem>
          )}

          <ListItem className={classes.option}>
            <ListItemIcon>
              <AssignmentIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={'Postarile mele'} />
          </ListItem>

          <ListItem className={classes.option} onClick={onClose}>
            <Link to={`${path}/settings`}>
              <ListItemIcon>
                <SettingsIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={'Setari'} />
            </Link>
          </ListItem>

          {has(user, 'role') &&
            (user.role.type === USER_ROLE_ADMIN ||
              user.role.type === USER_ROLE_OWNER) && (
              <ListItem className={classes.option}>
                <ListItemIcon>
                  <GroupIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={'Utilizatori'} />
              </ListItem>
            )}

          <ListItem className={classes.logout} onClick={handleLogOut}>
            <ListItemIcon>
              <PowerSettingsNewIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={'Deconectare'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

SideMenu.propTypes = {
  open: PropType.bool.isRequired,
  onClose: PropType.func.isRequired,
  user: PropType.object.isRequired,
};

export default SideMenu;
