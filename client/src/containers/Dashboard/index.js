// System
import React, { useEffect, useContext } from 'react';
import { Redirect, Route, useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// Context
import { AuthContext } from '../../context/authContext';
// Components
import Navbar from '../../components/Navbar';
import Settings from '../Settings';
import Users from '../Users';
import User from '../User';
import Categories from '../Categories';
// Actions
import { getUser } from './actions';
// Styles
import style from '../../styles/DashboardStyle';

function Dashboard() {
  const classes = makeStyles(style)();
  const { isLoggedIn } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const { user } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return isLoggedIn ? (
    <Box className={classes.dashboard}>
      <Navbar user={user} />
      <Route
        exact
        path={`${url}/settings`}
        component={() => <Settings user={user} />}
      />
      <Route exact path={`${url}/users`} component={Users} />
      <Route
        exact
        path={`${url}/user/:id`}
        component={() => <User loggedUser={user} />}
      />
      <Route exact path={`${url}/categories`} component={Categories} />
    </Box>
  ) : (
    <Redirect to="/login" />
  );
}

export default Dashboard;
