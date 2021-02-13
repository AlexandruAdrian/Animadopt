// System
import React from 'react';
import { Link } from 'react-router-dom';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// Icons
import AddIcon from '@material-ui/icons/Add';
// Styles
import styles from '../styles/MobileAddPostButtonStyles';

function MobileAddPostButton() {
  const classes = makeStyles(styles)();

  return (
    <Link to={`/dashboard/posts/add`} className={classes.button}>
      <AddIcon />
      <Typography component={'p'}>Adauga</Typography>
    </Link>
  );
}

export default MobileAddPostButton;
