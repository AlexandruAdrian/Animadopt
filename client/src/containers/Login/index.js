import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// Components
import BackArrow from '../../components/BackArrow';
import LoginForm from '../../components/LoginForm';
import CustomButton from '../../components/CustomButton';
import Banned from '../../components/Banned';
// Actions
import { loginUser } from './actions';
// Styles
import styles from '../../styles/LoginStyle';

const Login = () => {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const { response } = useSelector((state) => state.login);

  const INITIAL_VALUES = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validateOnMount: true,
  });
  const handleSubmit = () => {
    dispatch(loginUser(formik.values));
  };

  return (
    <Box className={classes.container}>
      <Banned banDetails={response} />
      <Box className={classes.formContainer}>
        <BackArrow to="/" />
        <Box className={classes.logo}></Box>
        <Box className={classes.formWrapper}>
          <Box className={classes.form}>
            <LoginForm
              values={formik.values}
              handleChange={formik.handleChange}
            />
          </Box>
          <CustomButton text="Autentificare" primary handler={handleSubmit} />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
