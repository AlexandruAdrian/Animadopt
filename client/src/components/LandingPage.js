// System
import React from 'react';
// Components
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Styles
import styles from '../styles/LandingPageStyles';

const LandingPage = () => {
  const classes = makeStyles(styles)();

  return (
    <div className={classes.container}>
      <Box className={classes.logoPets}>
        <div className={classes.pets} />
        <div className={classes.logo} />
      </Box>

      <Box className={classes.promoButtons}>
        <Box className={classes.promo}>
          <Typography variant="h1">
            Un prieten nou in casa ta va fi un membru nou in viata ta
          </Typography>
        </Box>

        <Box className={classes.login}>
          <div className={classes.logoRight} />

          <Box className={classes.buttons}>
            <Link to="/login">
              <CustomButton text="Autentificare" dark />
            </Link>
            <Link to="/register">
              <CustomButton text="Inregistrare" secondary />
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default LandingPage;
