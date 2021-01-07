// System
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import CustomDropzone from './CustomDropzone';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonIcon from '@material-ui/icons/Person';
// Styles
import styles from '../styles/RegisterFormStyles';

const RegisterForm = ({
  activeStep,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  const classes = makeStyles(styles)();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const stepOne = () => {
    if (activeStep === 0) {
      return (
        <>
          <FormControl>
            <TextField
              error={!!(touched.email && errors.email)}
              helperText={touched.email && errors.email ? errors.email : null}
              id="email"
              label="Email"
              aria-describedby="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              InputProps={{
                classes: {
                  root: classes.inputRoot,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon className={classes.adornment} fontSize="small" />
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

          <div className={classes.inputBox}>
            <FormControl>
              <TextField
                error={!!(touched.lastName && errors.lastName)}
                helperText={
                  touched.lastName && errors.lastName ? errors.lastName : null
                }
                id="lastName"
                label="Nume"
                aria-describedby="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon
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

            <FormControl>
              <TextField
                error={!!(touched.firstName && errors.firstName)}
                helperText={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : null
                }
                id="firstName"
                label="Prenume"
                aria-describedby="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon
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
          </div>

          <div className={classes.inputBox}>
            <FormControl>
              <TextField
                error={!!(touched.password && errors.password)}
                helperText={
                  touched.password && errors.password ? errors.password : null
                }
                id="password"
                type={showPassword ? 'text' : 'password'}
                label="Parola"
                aria-describedby="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
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

            <FormControl>
              <TextField
                error={
                  !!(
                    touched.passwordConfirmation && errors.passwordConfirmation
                  )
                }
                helperText={
                  touched.passwordConfirmation && errors.passwordConfirmation
                    ? errors.passwordConfirmation
                    : null
                }
                id="passwordConfirmation"
                aria-describedby="passwordConfirmation"
                label="Confirmare parola"
                type={showPassword ? 'text' : 'password'}
                value={values.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
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
          </div>

          <FormControl>
            <TextField
              error={!!(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone ? errors.phone : null}
              id="phone"
              label="Telefon"
              type="tel"
              aria-describedby="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              InputProps={{
                classes: {
                  root: classes.inputRoot,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneIcon className={classes.adornment} fontSize="small" />
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

          <FormControl className={classes.genderBox}>
            <FormLabel classes={{ root: classes.inputLabelRoot }}>
              Sex
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              className={classes.radioButtons}
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <FormControlLabel
                value="F"
                control={<Radio size="small" />}
                label="Feminin"
                classes={{ label: classes.inputLabelRoot }}
              />
              <FormControlLabel
                value="M"
                control={<Radio size="small" />}
                label="Masculin"
                classes={{ label: classes.inputLabelRoot }}
              />
            </RadioGroup>
            {errors.gender && touched.gender ? (
              <div className={classes.genderError}>{errors.gender}</div>
            ) : null}
          </FormControl>
        </>
      );
    }
  };

  const stepTwo = () => {
    if (activeStep === 1) {
      return (
        <div className={classes.stepTwo}>
          <Typography component="p">
            Ajuta-i pe ceilalti sa te cunoasca mai bine, adauga o imagine de
            profil
          </Typography>
          <CustomDropzone
            setFieldValue={setFieldValue}
            multipleFiles={false}
            addedImages={values.avatar}
          />
        </div>
      );
    }
  };

  return (
    <form className={classes.form}>
      {stepOne()}
      {stepTwo()}
    </form>
  );
};

RegisterForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default RegisterForm;
