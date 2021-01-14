// System
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
import CustomButton from '../../components/CustomButton';
import BackArrow from '../../components/BackArrow';
import RecoverySuccess from '../../components/RecoverySuccess';
import Loading from '../../components/Loading';
// Icons
import EmailIcon from '@material-ui/icons/Email';
// Actions
import {
  recoverPassword,
  requestConfirmation,
  resetRecoveryState,
} from './actions';
// Utilities
import { has } from 'lodash';
// Style
import style from '../../styles/AccountRecoveryStyle';

function AccountRecovery(props) {
  const INITIAL_VALUES = { email: '' };
  const dispatch = useDispatch();
  const { response, isLoading } = useSelector((state) => state.recovery);

  useEffect(() => {
    return () => dispatch(resetRecoveryState());
  }, [dispatch]);

  const classes = makeStyles(style)();
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validateOnMount: true,
  });

  const handleSubmit = () => {
    if (props.password) {
      dispatch(recoverPassword(formik.values));
    } else if (props.activate) {
      dispatch(requestConfirmation(formik.values));
    }
  };

  return (
    <Box className={classes.container}>
      <BackArrow to="/login" />
      <Box className={classes.wrapper}>
        {isLoading ? (
          <Loading />
        ) : (
          <form className={classes.form}>
            <FormControl className={classes.formControl}>
              <TextField
                id="email"
                label="Email"
                aria-describedby="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon
                        className={classes.adornment}
                        fontSize="small"
                      />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabelRoot,
                  },
                }}
              />
            </FormControl>
            <CustomButton
              text="Trimite"
              handler={handleSubmit}
              primary
            ></CustomButton>
            <Typography className={classes.error}>
              {has(response, 'err') && response.err}
            </Typography>
          </form>
        )}
      </Box>
      {has(response, 'message') && (
        <RecoverySuccess message={response.message} />
      )}
    </Box>
  );
}

AccountRecovery.propTypes = {
  password: PropTypes.bool,
  activate: PropTypes.bool,
};

export default AccountRecovery;
