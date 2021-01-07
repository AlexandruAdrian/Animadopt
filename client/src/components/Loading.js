// System
import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//Styles
import styles from '../styles/LoadingStyles.js';

function Loading() {
  const classes = makeStyles(styles)();

  return (
    <div className={classes.loadingContainer}>
      <div className={classes.ldsHeart}>
        <div></div>
      </div>
      <Typography component="p" className={classes.loadingText}>
        Se incarca...
      </Typography>
    </div>
  );
}

export default Loading;
