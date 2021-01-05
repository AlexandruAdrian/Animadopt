import React, { useState } from 'react';
import { useFormik } from 'formik';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// Components
import CustomStepper from '../../components/CustomStepper';
import RegisterForm from '../../components/RegisterForm';
// Validator
import registerValidationSchema from '../../validators/registerValidator';
// Styles
import styles from '../../styles/RegisterStyles';

const Register = () => {
  const classes = makeStyles(styles)();
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

  const lastStep = activeStep === 2;

  const handleSubmit = (values) => {
    if (lastStep) {
      console.log('values', values);
    } else {
      console.log('values', values);
    }
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: registerValidationSchema,
    isInitialValid: false,
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

  const handleBack = () => setActiveStep(activeStep - 1);

  return (
    <Box className={classes.container}>
      <Box className={classes.formContainer}>
        <Box className={classes.logo}></Box>
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
      </Box>
    </Box>
  );
};

export default Register;
