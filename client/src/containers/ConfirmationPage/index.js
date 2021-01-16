// System
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Components
import Loading from '../../components/Loading';
// Actions
import { confirmAccount } from './actions';
import { resetRequestState } from '../../utils/request/actions';
// Styles
import styles from '../../styles/ConfirmationPageStyle';

function ConfirmationPage() {
  const match = useRouteMatch();
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const { response, isLoading } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(confirmAccount(match.params.id));

    return () => dispatch(resetRequestState());
  }, [dispatch, match.params.id]);

  return (
    <div className={classes.confirmationContainer}>
      <div className={classes.textWrapper}>
        {response.message && !isLoading ? (
          <Typography component="h1">
            {response.message}
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
