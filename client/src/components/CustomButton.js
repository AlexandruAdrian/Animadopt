// System
import React from 'react';
import PropTypes from 'prop-types';
// Components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// Styles
import styles from '../styles/CustomButtonStyle';

function CustomButton({ handler, text, primary, ...rest }) {
  const classes = makeStyles(styles)();

  return (
    <Button
      className={primary ? classes.primary : classes.secondary}
      onClick={handler}
      {...rest}
    >
      {text}
    </Button>
  );
}

CustomButton.propTypes = {
  primary: PropTypes.bool,
  handler: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default CustomButton;
