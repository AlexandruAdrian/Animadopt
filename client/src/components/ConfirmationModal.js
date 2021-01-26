// System
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
// Components
import CustomButton from './CustomButton';
// Style
import styles from '../styles/ConfirmationModalStyle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function ConfirmationModal({
  open,
  onClose,
  confirmationText,
  confirmationHandler,
}) {
  const classes = makeStyles(styles)();
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
          <Typography component={'p'}>{confirmationText}</Typography>
          <Box className={classes.actions}>
            <CustomButton text={'Nu'} handler={handleDecline} size={'small'} />
            <CustomButton
              text={'Da'}
              handler={confirmationHandler}
              size={'small'}
              primary
            />
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  confirmationText: PropTypes.string.isRequired,
  confirmationHandler: PropTypes.func.isRequired,
};

export default ConfirmationModal;
