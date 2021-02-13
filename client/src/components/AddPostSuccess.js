// System
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// Styles
import styles from '../styles/AddPostSucessStyles';
import CustomButton from './CustomButton';

function AddPostSuccess({ response }) {
  const classes = makeStyles(styles)();

  const buttonHandler = () => {
    window.location.href = '/dashboard/posts';
  };

  return (
    <Box className={classes.successWrapper}>
      <Box className={classes.iconWrapper}>
        <CheckCircleIcon />
      </Box>

      <Typography component="p">{response.message}</Typography>

      <CustomButton text={'Postarile mele'} dark handler={buttonHandler} />
    </Box>
  );
}

AddPostSuccess.propTypes = {
  response: PropTypes.object.isRequired,
};

export default AddPostSuccess;
