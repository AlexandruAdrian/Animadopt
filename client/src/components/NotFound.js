// System
import React from 'react';
import { useHistory } from 'react-router';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
import CustomButton from './CustomButton';
// Style
import style from '../styles/NotFoundStyle';

function NotFound() {
  const history = useHistory();
  const classes = makeStyles(style)();

  const handleClick = () => history.push('/');

  return (
    <Box className={classes.container}>
      <h1 className={classes.header}>404</h1>
      <Box className={classes.picture}></Box>
      <Typography component="p" className={classes.text}>
        Oops! Se pare ca te-ai pierdut, click pe buton pentru a te intoarce
        acasa
      </Typography>
      <CustomButton text={'Acasa'} primary handler={handleClick} />
    </Box>
  );
}

export default NotFound;
