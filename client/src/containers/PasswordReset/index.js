// System
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
// Components
import BackArrow from '../../components/BackArrow';
import Loading from '../../components/Loading';
import CustomButton from '../../components/CustomButton';
// Actions
import { resetPassword } from './actions';
import { resetRequestState } from '../../utils/request/actions';
// Validator
import resetPassValidator from '../../validators/resetPassValidator';
// Utilities
import { has } from 'lodash';
// Style
import style from '../../styles/PasswordReset';

function PasswordReset() {
  const INITIAL_VALUES = {
    password: '',
    passwordConfirmation: '',
  };
  const dispatch = useDispatch();
  const classes = makeStyles(style)();
  const match = useRouteMatch();
  const [showPassword, setShowPassword] = useState(false);
  const { response, isLoading } = useSelector((state) => state.request);

  const handleSubmit = (values) => {
    dispatch(
      resetPassword(
        values.password,
        values.passwordConfirmation,
        match.params.id
      )
    );
  };
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: resetPassValidator,
    validateOnMount: true,
    validateOnChange: false,
    onSubmit: handleSubmit,
  });

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleRedirect = () => {
    dispatch(resetRequestState());
  };

  return (
    <Box className={classes.container}>
      <BackArrow to="/login" />
      <Box className={classes.wrapper}>
        {isLoading ? (
          <Loading />
        ) : has(response, 'message') ? (
          <Box className={classes.success}>
            {response.message}
            {', '}
            <Link to={'/'} onClick={handleRedirect}>
              {'click aici'}
            </Link>
            {` pentru a fi redirectionat catre pagina principala`}
          </Box>
        ) : (
          <Box className={classes.formContainer}>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <FormControl className={classes.formControl}>
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  id="password"
                  helperText={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : null
                  }
                  label="Parola noua"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    classes: {
                      root: classes.inputRoot,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPassword ? (
                          <VisibilityIcon
                            className={classes.adornment}
                            onClick={handlePasswordToggle}
                            fontSize="small"
                          />
                        ) : (
                          <VisibilityOffIcon
                            className={classes.adornment}
                            onClick={handlePasswordToggle}
                            fontSize="small"
                          />
                        )}
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
              <FormControl className={classes.formControl}>
                <TextField
                  error={
                    !!(
                      formik.touched.passwordConfirmation &&
                      formik.errors.passwordConfirmation
                    )
                  }
                  helperText={
                    formik.touched.passwordConfirmation &&
                    formik.errors.passwordConfirmation
                      ? formik.errors.passwordConfirmation
                      : null
                  }
                  id="passwordConfirmation"
                  label="Confirmare parola"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    classes: {
                      root: classes.inputRoot,
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabelRoot,
                    },
                  }}
                />
              </FormControl>
              <CustomButton text="Trimite" primary type="submit" />
            </form>
            {has(response, 'err') && (
              <Box className={classes.error}>{response.err}</Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PasswordReset;
