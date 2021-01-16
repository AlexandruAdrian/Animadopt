// System
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
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
import { recoverPassword, requestConfirmation } from './actions';
import { resetRequestState } from '../../utils/request/actions';
// Validator
import recoverValidatorSchema from '../../validators/recoverValidator';
// Utilities
import { has } from 'lodash';
// Style
import style from '../../styles/AccountRecoveryStyle';

function AccountRecovery(props) {
  const INITIAL_VALUES = { email: '' };
  const dispatch = useDispatch();
  const history = useHistory();
  const { response, isLoading } = useSelector((state) => state.request);

  useEffect(() => {
    return () => dispatch(resetRequestState());
  }, [dispatch]);

  const handleSubmit = () => {
    if (props.recover) {
      dispatch(recoverPassword(formik.values));
    } else if (props.activate) {
      dispatch(requestConfirmation(formik.values));
    }
  };

  const handleBack = () => {
    dispatch(resetRequestState());
    history.push('/');
  };

  const classes = makeStyles(style)();
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: recoverValidatorSchema,
    validateOnMount: true,
    validateOnChange: false,
    onSubmit: handleSubmit,
  });

  return (
    <Box className={classes.container}>
      <BackArrow to="/login" />
      <Box className={classes.wrapper}>
        {isLoading ? (
          <Loading />
        ) : (
          <Box className={classes.formWrapper}>
            <Box className={classes.nav}>
              <Box className={classes.logo} onClick={handleBack}></Box>
            </Box>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <FormControl className={classes.formControl}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  helperText={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : null
                  }
                  id="email"
                  label="Email"
                  aria-describedby="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              <CustomButton text="Trimite" type="submit" primary />
              <Typography className={classes.error}>
                {has(response, 'err') && response.err}
              </Typography>
            </form>
          </Box>
        )}
      </Box>
      {has(response, 'message') && (
        <RecoverySuccess message={response.message} />
      )}
    </Box>
  );
}

AccountRecovery.propTypes = {
  recover: PropTypes.bool,
  activate: PropTypes.bool,
};

export default AccountRecovery;
