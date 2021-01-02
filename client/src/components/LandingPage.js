// System
import React from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Styles
import styles from '../styles/LandingPageStyles';

const LandingPage = () => {
  const classes = makeStyles(styles)();

  return (
    <div className={classes.container}>
      <Box className={classes.logoPets}>
        <div className={classes.pets}></div>
        <div className={classes.logo}></div>
      </Box>

      <Box className={classes.promoButtons}>
        <Box className={classes.promo}>
          <Typography variant="h1">
            Un prieten nou in casa ta va fi un membru nou in viata ta
          </Typography>
        </Box>

        <Box className={classes.login}>
          <div className={classes.logoRight}></div>

          <Box className={classes.buttons}>
            <Button>Autentificare</Button>
            <Button>Inregistrare</Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default LandingPage;
