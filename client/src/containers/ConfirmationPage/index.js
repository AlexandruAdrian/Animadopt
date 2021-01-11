// System
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Components
import Loading from '../../components/Loading';
// Actions
import { confirmAccount } from './actions';
// Styles
import styles from '../../styles/ConfirmationPageStyle';

function ConfirmationPage(props) {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const { response, isLoading } = useSelector((state) => state.confirmation);

  useEffect(() => {
    dispatch(confirmAccount(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div className={classes.confirmationContainer}>
      <div className={classes.textWrapper}>
        {response && !isLoading ? (
          <Typography component="h1">
            {response}
            {', '}
            <Link to={'/'}>{'click aici'}</Link>
            {` pentru a fi redirectionat catre pagina principala`}
          </Typography>
        ) : null}
        {isLoading && <Loading />}
      </div>
    </div>
  );
}

export default ConfirmationPage;
