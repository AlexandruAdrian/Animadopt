import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Context
import { Redirect } from 'react-router';
import { AuthContext } from '../../context/authContext';
// Components
import CustomStepper from '../../components/CustomStepper';
import RegisterForm from '../../components/RegisterForm';
import CustomButton from '../../components/CustomButton';
import Loading from '../../components/Loading';
import BackArrow from '../../components/BackArrow';
// Actions
import { registerUser } from './actions';
import { resetRequestState } from '../../utils/request/actions';
// Validator
import registerValidationSchema from '../../validators/registerValidator';
// Styles
import styles from '../../styles/RegisterStyles';

const Register = ({ history }) => {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const { response, isLoading } = useSelector((state) => state.request);
  const [activeStep, setActiveStep] = useState(0);

  const { isLoggedIn } = useContext(AuthContext);

  const INITIAL_VALUES = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: '',
    phone: '',
    gender: '',
    avatar: null,
  };

  const lastStep = activeStep === 1;

  const handleSubmit = (values) => {
    if (lastStep) {
      const registerFormData = new FormData();
      registerFormData.append('email', values.email);
      registerFormData.append('firstName', values.firstName);
      registerFormData.append('lastName', values.lastName);
      registerFormData.append('password', values.password);
      registerFormData.append(
        'passwordConfirmation',
        values.passwordConfirmation
      );
      registerFormData.append('phone', values.phone);
      registerFormData.append('gender', values.gender);
      registerFormData.append(
        'avatar',
        values.avatar ? values.avatar[0] : null
      );

      dispatch(registerUser(registerFormData));
    }
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: registerValidationSchema,
    validateOnMount: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const handleNext = () => {
    formik.submitForm().then(() => {
      formik.validateForm();
      if (formik.isValid) {
        formik.setTouched({});
        if (!lastStep) {
          setActiveStep(activeStep + 1);
        }
      }
    });
  };

  const clearState = () => {
    dispatch(resetRequestState());
  };

  const successRegister = () => {
    return (
      <>
        <div className={classes.successWrapper}>
          <div>
            <Typography component="p">{response.message}</Typography>
            <Typography component="h2">Detalii cont:</Typography>
            <div className={classes.userDetailsWrapper}>
              <img
                alt="avatar"
                src={`${process.env.REACT_APP_API_ENDPOINT}/${response.user.avatar}`}
              />
              <ul>
                <li>
                  <strong>Email: </strong>
                  {response.user.email}
                </li>
                <li>
                  <strong>Nume: </strong>
                  {response.user.lastName}
                </li>
                <li>
                  <strong>Prenume: </strong>
                  {response.user.firstName}
                </li>
                <li>
                  <strong>Telefon: </strong>
                  {response.user.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Link to="/login" className={classes.registerSuccessFooter}>
          <CustomButton text="Autentificare" handler={clearState} dark />
        </Link>
      </>
    );
  };

  const failRegister = () => {
    const handleClick = () => {
      dispatch(resetRequestState());
      setActiveStep(0);
      history.push('/register');
    };

    return (
      <Box className={classes.failWrapper}>
        <Typography component="p">{response.message}</Typography>
        <CustomButton text="Inregistrare" dark handler={handleClick} />
      </Box>
    );
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  return !isLoggedIn ? (
    <Box className={classes.container}>
      <Box className={classes.formContainer}>
        <BackArrow to={'/'} handler={clearState} />
        <Box className={classes.nav}>
          <Box className={classes.logo} />
        </Box>

        {!Object.keys(response).length && !isLoading ? (
          <CustomStepper
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
          >
            <RegisterForm
              activeStep={activeStep}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              setFieldValue={formik.setFieldValue}
              setFieldError={formik.setFieldError}
            />
          </CustomStepper>
        ) : !isLoading && response.success ? (
          successRegister()
        ) : !isLoading && !response.success ? (
          failRegister()
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  ) : (
    <Redirect to="/dashboard" />
  );
};

export default Register;
