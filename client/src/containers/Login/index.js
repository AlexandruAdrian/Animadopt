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
import { loginUser } from './actions';
import { resetRequestState } from '../../utils/request/actions';
// Styles
import styles from '../../styles/LoginStyle';

const Login = ({ history }) => {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const { response } = useSelector((state) => state.request);

  const INITIAL_VALUES = {
    email: '',
    password: '',
  };

  useEffect(() => {
    return () => {
      dispatch(resetRequestState());
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validateOnMount: true,
  });
  const handleSubmit = () => {
    dispatch(loginUser(formik.values));
  };
  const handleBack = () => {
    dispatch(resetRequestState());
    history.push('/');
  };

  const handleRedirect = () => {
    dispatch(resetRequestState());
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

            <CustomButton text="Autentificare" primary handler={handleSubmit} />

            <Typography component="p" className={classes.error}>
              {get(response, 'message') && response.message}
            </Typography>
          </Box>
        </Box>

        <Box className={classes.utilities}>
          <Link to="/recover" onClick={handleRedirect}>
            <Typography>Am uitat parola</Typography>
          </Link>
          <Link to="/activate" onClick={handleRedirect}>
            <Typography>Activeaza cont</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
