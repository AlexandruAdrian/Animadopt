// System
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Box, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// Icons
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
// Styles
import styles from '../styles/UserInfoStyles';

function UserInfo({ user, showRole = true }) {
  const classes = makeStyles(styles)();

  return (
    <CardContent>
      <Box className={classes.user}>
        <img
          alt="avatar"
          src={`${process.env.REACT_APP_API_ENDPOINT}/${user.avatar}`}
        />
        <Typography component="p">{`${user.firstName} ${user.lastName}`}</Typography>
      </Box>

      <ul className={classes.userDetails}>
        <li>
          <PhoneIcon fontSize="small" />
          <strong>Telefon: </strong>
          {user.phone}
        </li>
        <li>
          <EmailIcon fontSize="small" />
          <strong>Email: </strong>
          {user.email}
        </li>
        {showRole && (
          <li>
            <BusinessCenterIcon fontSize="small" />
            <strong>Rol: </strong>
            {user.role.type}
          </li>
        )}
      </ul>
    </CardContent>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  showRole: PropTypes.bool,
};

export default UserInfo;
