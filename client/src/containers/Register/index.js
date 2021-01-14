import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
import CustomStepper from '../../components/CustomStepper';
import RegisterForm from '../../components/RegisterForm';
import CustomButton from '../../components/CustomButton';
import Loading from '../../components/Loading';
// Actions
import { registerUser, clearRegisterState } from './actions';
// Validator
import registerValidationSchema from '../../validators/registerValidator';
// Styles
import styles from '../../styles/RegisterStyles';

const Register = ({ history }) => {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const { response, isLoading } = useSelector((state) => state.register);
  const [activeStep, setActiveStep] = useState(0);
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
    dispatch(clearRegisterState());
    history.push('/');
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
          <CustomButton text="Autentificare" handler={clearState} primary />
        </Link>
      </>
    );
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  return (
    <Box className={classes.container}>
      <Box className={classes.formContainer}>
        <Box className={classes.nav}>
          <Box className={classes.logo} onClick={clearState}></Box>
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
            />
          </CustomStepper>
        ) : !isLoading ? (
          successRegister()
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

export default Register;
