import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
import LoginForm from '../../components/LoginForm';
import CustomButton from '../../components/CustomButton';
import Banned from '../../components/Banned';
// Actions
import { loginUser, resetLoginState } from './actions';
// Styles
import styles from '../../styles/LoginStyle';

const Login = ({ history }) => {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const { response } = useSelector((state) => state.login);

  const INITIAL_VALUES = {
    email: '',
    password: '',
  };

  useEffect(() => dispatch(resetLoginState()), [dispatch]);

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validateOnMount: true,
  });
  const handleSubmit = () => {
    dispatch(loginUser(formik.values));
  };
  const handleBack = () => {
    dispatch(resetLoginState());
    history.push('/');
  };

  return (
    <Box className={classes.container}>
      <Banned banDetails={response} />
      <Box className={classes.formContainer}>
        <Box className={classes.formWrapper}>
          <Box className={classes.nav}>
            <Box className={classes.logo} onClick={handleBack}></Box>
          </Box>
          <Box className={classes.form}>
            <LoginForm
              values={formik.values}
              handleChange={formik.handleChange}
            />
          </Box>
          <CustomButton text="Autentificare" primary handler={handleSubmit} />
          <Typography component="p" className={classes.error}>
            {get(response, 'err') && response.err}
          </Typography>
          <Box className={classes.utilities}>
            <Link to="/recover">
              <Typography>Am uitat parola</Typography>
            </Link>
            <Link to="/activate">
              <Typography>Activeaza cont</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
