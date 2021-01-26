// System
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
// Components
import CustomButton from './CustomButton';
// Actions
import { unbanUser } from '../containers/User/actions';
// Style
import styles from '../styles/UnbanModalStyle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function UnbanModal({ open, onClose, userId }) {
  const dispatch = useDispatch();
  const classes = makeStyles(styles)();

  const handleUnban = () => {
    dispatch(unbanUser(userId));
    onClose();
  };

  const handleDecline = () => onClose();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="admin-unban-modal"
      aria-describedby="admin-unban-modal"
      className={classes.modal}
    >
      <Paper elevation={9} className={classes.formContainer}>
        <Box className={classes.content}>
          <Typography component={'p'}>
            Sunteti sigur ca doriti sa deblocati utilizatorul ?
          </Typography>
          <Box className={classes.actions}>
            <CustomButton text={'Nu'} handler={handleDecline} size={'small'} />
            <CustomButton
              text={'Da'}
              handler={handleUnban}
              size={'small'}
              primary
            />
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}

UnbanModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default UnbanModal;
