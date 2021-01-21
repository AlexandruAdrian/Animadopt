// System
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Card, TextField } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
// Components
import Loading from '../../components/Loading';
import CustomButton from '../../components/CustomButton';
// Icons
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
// Actions
import { updateUserAvatar, changePassword } from './actions';
import { resetRequestState } from '../../utils/request/actions';
// Validators
import avatarValidationSchema from '../../validators/avatarChangeValidator';
import resetPassValidator from '../../validators/resetPassValidator';
// Utils
import { has } from 'lodash';
// Styles
import style from '../../styles/SettingsStyle';
import clsx from 'clsx';

function Settings({ user }) {
  const classes = makeStyles(style)();
  const dispatch = useDispatch();
  const { response, isLoading } = useSelector((state) => state.request);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const AVATAR_INITIAL_STATE = {
    file: undefined,
  };
  const PASSWORD_INITIAL_STATE = {
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  };

  const avatarForm = useFormik({
    initialValues: AVATAR_INITIAL_STATE,
    validationSchema: avatarValidationSchema,
    validateOnChange: true,
    onSubmit: handleAvatarSubmit,
  });
  const passwordForm = useFormik({
    initialValues: PASSWORD_INITIAL_STATE,
    validationSchema: resetPassValidator,
    validateOnBlur: true,
    onSubmit: handlePasswordSubmit,
  });

  function handleAvatarSubmit() {
    const avatarFormData = new FormData();
    avatarFormData.append('avatar', avatarForm.values.file);
    dispatch(updateUserAvatar(avatarFormData));
  }

  const handleAvatarChange = async (e) => {
    e.preventDefault();
    await avatarForm.setFieldValue(e.target.name, e.target.files[0]);
    await avatarForm.validateForm();
    await avatarForm.submitForm();
  };

  function handlePasswordSubmit() {
    const { oldPassword, password, passwordConfirmation } = passwordForm.values;
    dispatch(changePassword(oldPassword, password, passwordConfirmation));
  }

  useEffect(() => {
    return () => dispatch(resetRequestState());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <Card
        classes={{
          root: clsx({
            [classes.card]: true,
            [classes.userInfo]: true,
          }),
        }}
      >
        <CardHeader title="Informatii cont" />
        <CardContent>
          <Box className={classes.avatarWrapper}>
            <form onSubmit={avatarForm.handleSubmit}>
              <Button size="small" component="label">
                <PhotoCameraIcon fontSize="small" />
                <input
                  id="file"
                  name="file"
                  onChange={(e) => handleAvatarChange(e)}
                  type="file"
                  hidden
                />
              </Button>
              <Typography component="p">{avatarForm.errors.file}</Typography>
            </form>
            <img
              alt="avatar"
              src={`${process.env.REACT_APP_API_ENDPOINT}/${user.avatar}`}
            />
          </Box>
          <Box className={classes.details}>
            <ul>
              <li>
                <strong>Nume: </strong>
                {user.lastName}
              </li>
              <li>
                <strong>Prenume: </strong>
                {user.firstName}
              </li>
              <li>
                <strong>Telefon: </strong>
                {user.phone}
              </li>
              <li>
                <strong>Email: </strong>
                {user.email}
              </li>
            </ul>
          </Box>
        </CardContent>
      </Card>
      <Card
        classes={{
          root: clsx({
            [classes.card]: true,
            [classes.security]: true,
          }),
        }}
      >
        <CardHeader title="Schimbare parola" />
        {!isLoading ? (
          <CardContent>
            <form onSubmit={passwordForm.handleSubmit}>
              <FormControl>
                <TextField
                  error={
                    !!(
                      passwordForm.touched.oldPassword &&
                      passwordForm.errors.oldPassword
                    )
                  }
                  helperText={
                    passwordForm.touched.oldPassword &&
                    passwordForm.errors.oldPassword
                      ? passwordForm.errors.oldPassword
                      : null
                  }
                  id="oldPassword"
                  aria-describedby="oldPassword"
                  label="Parola veche"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordForm.values.oldPassword}
                  onChange={passwordForm.handleChange}
                  onBlur={passwordForm.handleBlur}
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

              <FormControl>
                <TextField
                  error={
                    !!(
                      passwordForm.touched.password &&
                      passwordForm.errors.password
                    )
                  }
                  helperText={
                    passwordForm.touched.password &&
                    passwordForm.errors.password
                      ? passwordForm.errors.password
                      : null
                  }
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Parola"
                  aria-describedby="password"
                  value={passwordForm.values.password}
                  onChange={passwordForm.handleChange}
                  onBlur={passwordForm.handleBlur}
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
                      passwordForm.touched.passwordConfirmation &&
                      passwordForm.errors.passwordConfirmation
                    )
                  }
                  helperText={
                    passwordForm.touched.passwordConfirmation &&
                    passwordForm.errors.passwordConfirmation
                      ? passwordForm.errors.passwordConfirmation
                      : null
                  }
                  id="passwordConfirmation"
                  aria-describedby="passwordConfirmation"
                  label="Confirmare parola"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordForm.values.passwordConfirmation}
                  onChange={passwordForm.handleChange}
                  onBlur={passwordForm.handleBlur}
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
              <CustomButton dark text="Schimba parola" type="submit" />
            </form>
          </CardContent>
        ) : (
          <Loading />
        )}
      </Card>
    </div>
  );
}

Settings.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Settings;
