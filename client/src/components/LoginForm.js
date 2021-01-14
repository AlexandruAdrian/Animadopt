// System
import React, { useState } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
// styles
import styles from '../styles/LoginFormStyle';

const LoginForm = ({ values, handleChange }) => {
  const classes = makeStyles(styles)();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <FormControl>
        <TextField
          id="email"
          label="Email"
          aria-describedby="email"
          value={values.email}
          onChange={handleChange}
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

      <FormControl style={{ marginTop: '5px' }}>
        <TextField
          id="password"
          type={showPassword ? 'text' : 'password'}
          label="Parola"
          aria-describedby="password"
          value={values.password}
          onChange={handleChange}
          InputLabelProps={{
            classes: {
              root: classes.inputLabelRoot,
            },
          }}
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
        />
      </FormControl>
    </>
  );
};

export default LoginForm;
