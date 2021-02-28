// System
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// Icons
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import FlagIcon from '@material-ui/icons/Flag';
// Actions
import { getUserBanHistory } from '../containers/User/actions';
// Utils
import { get } from 'lodash';
// Styles
import styles from '../styles/UserStyles';
import moment from 'moment';

function UserBanHistory({ user }) {
  const classes = makeStyles(styles)();
  const { banHistory } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (get(user, '_id')) {
      dispatch(getUserBanHistory(user._id));
    }
  }, [dispatch]);

  return (
    <Box className={classes.banHistory}>
      <Card className={classes.historyCard}>
        <Typography component="h3">Istoric penalizari</Typography>
        {!banHistory.length && (
          <Typography component="p">
            Nu exista penalizari pentru acest utilizator
          </Typography>
        )}
      </Card>

      {banHistory.length !== 0 && (
        <Box className={classes.bans}>
          {banHistory.map((ban) => (
            <Card className={classes.banDetails}>
              <Box>
                <CalendarTodayIcon fontSize="small" />
                <strong>De la: </strong>
                {moment(ban.startTime).format('DD/MM/YYYY')}
              </Box>

              <Box>
                <CalendarTodayIcon fontSize="small" />
                <strong>Pana la: </strong>
                {moment(ban.endTime).format('DD/MM/YYYY')}
              </Box>

              <Box>
                <FlagIcon fontSize="small" />
                <strong>Activ: </strong>
                <Typography
                  component="p"
                  className={
                    ban.isValid
                      ? classes.inactiveBanText
                      : classes.activeBanText
                  }
                >
                  {ban.isValid ? 'Da' : 'Nu'}
                </Typography>
              </Box>

              <Box>
                <AssignmentLateIcon fontSize="small" />
                <strong>Motiv: </strong>
                {ban.reason}
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

UserBanHistory.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserBanHistory;
