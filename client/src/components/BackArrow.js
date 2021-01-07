// System
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Material UI
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
// Styles
import styles from '../styles/BackArrowStyles';

function BackArrow({ to, handler }) {
  const classes = makeStyles(styles)();

  return (
    <Link to={to} className={classes.backArrow}>
      <ArrowBackIcon onClick={handler} />
    </Link>
  );
}

BackArrow.propTypes = {
  to: PropTypes.string.isRequired,
  handler: PropTypes.func,
};

export default BackArrow;
