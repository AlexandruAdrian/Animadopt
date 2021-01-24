// System
import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
// Actions
import { banUser } from '../containers/Users/actions';
// Style
import styles from '../styles/BanModalStyle';
import CustomButton from './CustomButton';
import moment from 'moment';

function BanModal({ open, onClose, userId }) {
  const dispatch = useDispatch();
  const classes = makeStyles(styles)();

  const date = new Date();
  date.setDate(date.getDate() + 7);

  const INITIAL_VALUES = {
    startTime: moment(new Date()).format('YYYY-MM-DDThh:mm'),
    endTime: moment(date).format('YYYY-MM-DDTHH:mm'),
    reason: '',
  };

  const { values, handleChange, setFieldValue } = useFormik({
    initialValues: INITIAL_VALUES,
  });

  const handleClose = () => {
    setFieldValue('endTime', moment(date).format('YYYY-MM-DDThh:mm'));
    setFieldValue('reason', '');
    onClose();
  };

  const handleBan = () => {
    const banDetails = {
      ...values,
      userId,
    };
    dispatch(banUser(banDetails));
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="admin-ban-modal"
      aria-describedby="admin-ban-modal"
      className={classes.modal}
    >
      <Paper elevation={9} className={classes.formContainer}>
        <form className={classes.form}>
          <div>
            <FormControl fullWidth>
              <TextField
                id="endTime"
                label="Expira la"
                type="datetime-local"
                className={classes.datePicker}
                value={values.endTime}
                onChange={handleChange}
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                id="reason"
                label="Motiv"
                multiline
                rowsMax={7}
                value={values.reason}
                onChange={handleChange}
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </div>

          <CustomButton handler={handleBan} danger text={'Blocheaza'} />
        </form>
      </Paper>
    </Modal>
  );
}

BanModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default BanModal;
