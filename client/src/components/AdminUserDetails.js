// System
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
// Components
import CustomButton from './CustomButton';
import UserInfo from './UserInfo';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions } from '@material-ui/core';
// Actions
import { setSelectedUser } from '../containers/Users/actions';
// Style
import style from '../styles/AdminUserDetailsStyle';

function AdminUserDetails({ user }) {
  const classes = makeStyles(style)();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  moment().locale('ro');

  const handleUserDetails = () => {
    dispatch(setSelectedUser(user));
    history.push(`/dashboard/user/${user._id}`);
  };

  return (
    <Card className={classes.userCard}>
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
  );
}

AdminUserDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminUserDetails;
