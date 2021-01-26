// System
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Box, CardContent } from '@material-ui/core';
// Icons
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
// Styles
import styles from '../styles/AdminUserDetailsStyle';

function UserInfo({ user }) {
  const classes = makeStyles(styles)();

  return (
    <CardContent>
      <Box className={classes.avatar}>
        <img
          alt="avatar"
          src={`${process.env.REACT_APP_API_ENDPOINT}/${user.avatar}`}
        />
      </Box>
      <Box className={classes.details}>
        <ul>
          <li>
            <PersonIcon fontSize="small" />
            <strong>Nume: </strong>
            {user.lastName}
          </li>
          <li>
            <PersonIcon fontSize="small" />
            <strong>Prenume: </strong>
            {user.firstName}
          </li>
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
        </ul>
      </Box>
    </CardContent>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserInfo;
