// System
import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
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
import ProtectedRoute from '../../components/ProtectedRoute';

function Dashboard() {
  const classes = makeStyles(style)();
  const { url } = useRouteMatch();
  const { user } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Box className={classes.dashboard}>
      <Navbar user={user} />
      <ProtectedRoute
        exact
        path={`${url}/settings`}
        component={() => <Settings user={user} />}
      />
    </Box>
  );
}

export default Dashboard;
