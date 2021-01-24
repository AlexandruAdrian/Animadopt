// System
import React from 'react';
import PropTypes from 'prop-types';
// Components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// Styles
import styles from '../styles/CustomButtonStyle';

function CustomButton({ handler, text, primary, dark, danger, ...rest }) {
  const classes = makeStyles(styles)();
  let buttonStyle;

  if (primary) {
    buttonStyle = classes.primary;
  } else if (dark) {
    buttonStyle = classes.dark;
  } else if (danger) {
    buttonStyle = classes.danger;
  } else {
    buttonStyle = classes.secondary;
  }

  return (
    <Button className={buttonStyle} onClick={handler} {...rest}>
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
