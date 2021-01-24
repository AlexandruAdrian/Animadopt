// System
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
// Components
import CustomButton from './CustomButton';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardActions, CardContent } from '@material-ui/core';
// Icons
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
// Style
import style from '../styles/AdminUserDetailsStyle';

function AdminUserDetails({ user, openBanModal, setUserId }) {
  const classes = makeStyles(style)();
  moment().locale('ro');

  const handleModal = () => {
    openBanModal();
    setUserId(user._id);
  };

  return (
    <Card className={classes.userCard}>
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
      <CardActions className={classes.userActions} disableSpacing={true}>
        {user.ban && user.ban.isValid && (
          <p className={classes.banned}>
            <strong>Utilizator blocat pana la: </strong>
            {moment(user.ban.endTime).format('llll')}
          </p>
        )}
        <CustomButton
          handler={() => {}}
          text={'Detalii utilizator'}
          size="small"
          primary
        />
        {!user.ban && (
          <CustomButton
            handler={handleModal}
            text={'Blocheaza utilizator'}
            size="small"
            danger
          />
        )}
      </CardActions>
    </Card>
  );
}

AdminUserDetails.propTypes = {
  user: PropTypes.object.isRequired,
  openBanModal: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
};

export default AdminUserDetails;
