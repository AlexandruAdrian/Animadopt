// System
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
// Components
import CustomButton from './CustomButton';
import UserInfo from './UserInfo';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
// Actions
import { setSelectedUser } from '../containers/Users/actions';
// Style
import style from '../styles/AdminUserDetailsStyle';

function AdminUserDetails({ user, lastUserRef }) {
  const classes = makeStyles(style)();
  const dispatch = useDispatch();
  const history = useHistory();
  moment().locale('ro');

  const handleUserDetails = () => {
    dispatch(setSelectedUser(user));
    history.push(`/dashboard/user/${user._id}`);
  };

  return (
    <Fade in>
      <Card className={classes.userCard} ref={lastUserRef}>
        <UserInfo user={user} />
        <CardActions className={classes.userActions} disableSpacing={true}>
          {user.ban && user.ban.isValid && (
            <p className={classes.banned}>
              <strong>Utilizator blocat pana la: </strong>
              {moment(user.ban.endTime).format('llll')}
            </p>
          )}
          <CustomButton
            handler={handleUserDetails}
            text={'Detalii utilizator'}
            size="small"
            dark
          />
        </CardActions>
      </Card>
    </Fade>
  );
}

AdminUserDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminUserDetails;
