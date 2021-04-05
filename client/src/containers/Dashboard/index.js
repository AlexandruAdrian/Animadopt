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
import UserPosts from '../../components/UserPosts';
import AddPosts from '../AddPost';
import ReviewsPage from '../ReviewsPage';
import Post from '../Post';
import DashboardPosts from '../../components/DashboardPosts';
// Actions
import { getUser, getLocations } from './actions';
import { fetchCategories } from '../Categories/actions';
import { resetRequestState } from '../../utils/request/actions';
// Styles
import style from '../../styles/DashboardStyle';

function Dashboard() {
  const classes = makeStyles(style)();
  const { isLoggedIn } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const { user, selectedPost } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getLocations());
    dispatch(resetRequestState());
    dispatch(fetchCategories());
  }, [dispatch]);

  return isLoggedIn ? (
    <Box className={classes.dashboard}>
      <Navbar user={user} />

      <Route exact path={url} component={DashboardPosts} />
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
      <Route exact path={`${url}/posts`} component={UserPosts} />
      <Route exact path={`${url}/reviews`} component={ReviewsPage} />
      <Route exact path={`${url}/posts/add`} component={AddPosts} />
      <Route
        exact
        path={`${url}/posts/post/:id`}
        component={() => <Post selectedPost={selectedPost} loggedUser={user} />}
      />
    </Box>
  ) : (
    <Redirect to="/login" />
  );
}

export default Dashboard;
