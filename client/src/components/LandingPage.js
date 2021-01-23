// System
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
// Components
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';
// Material UI
// Hooks
import useLoginStatus from '../hooks/useLoginStatus';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Styles
import styles from '../styles/LandingPageStyles';

const LandingPage = () => {
  const classes = makeStyles(styles)();
  const history = useHistory();
  const isLoggedIn = useLoginStatus();

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/dashboard');
    }
  }, [history, isLoggedIn]);

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
            <Link to="/login">
              <CustomButton text="Autentificare" primary />
            </Link>
            <Link to="/register">
              <CustomButton text="Inregistrare" />
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default LandingPage;
