// System
import React, { useEffect } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// Hooks
import useLoginStatus from '../../hooks/useLoginStatus';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// Components
import Navbar from '../../components/Navbar';
import Settings from '../Settings';
// Actions
import { getUser } from './actions';
// Styles
import style from '../../styles/DashboardStyle';

function Dashboard() {
  const classes = makeStyles(style)();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { user } = useSelector((state) => state.dashboard);
  const isLoggedIn = useLoginStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/');
    } else {
      dispatch(getUser());
    }
  }, [dispatch, history]);

  return (
    <Box className={classes.dashboard}>
      <Navbar user={user} />

      <Route
        exact
        path={`${url}/settings`}
        component={() => <Settings user={user} />}
      />
    </Box>
  );
}

export default Dashboard;
