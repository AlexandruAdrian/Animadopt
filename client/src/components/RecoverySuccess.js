// System
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// Components
import CustomButton from './CustomButton';
// Style
import style from '../styles/RecoverySuccessStyle';

function RecoverySuccess({ message }) {
  const classes = makeStyles(style)();
  const [show, setShow] = useState(false);
  const history = useHistory();

  const clickHandler = () => {
    setShow(false);
    history.push('/login');
  };

  useEffect(() => {
    setShow(message.length > 0);
  }, [message]);

  return show ? (
    <Box className={classes.recoveryModal}>
      <Box className={classes.wrapper}>
        <Typography component="p">{message}</Typography>
        <Box className={classes.buttonWrapper}>
          <CustomButton text={'Autentificare'} handler={clickHandler} dark />
        </Box>
      </Box>
    </Box>
  ) : null;
}

RecoverySuccess.propTypes = {
  message: PropTypes.string.isRequired,
};

export default RecoverySuccess;
