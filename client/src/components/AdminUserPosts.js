// System
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import { makeStyles } from '@material-ui/core';
import { Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Actions
import { getUserPosts } from '../containers/User/actions';
// Styles
import styles from '../styles/UserStyles';
import PostPreview from './PostPreview';

function AdminUserPosts({ userId }) {
  const { userPosts } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const classes = makeStyles(styles)();

  useEffect(() => {
    if (userId) {
      dispatch(getUserPosts(userId));
    }
  }, [dispatch, userId]);

  return (
    <Box className={classes.postsHistory}>
      <Card className={classes.postsCard}>
        <Typography component="h3">Anunturi utilizator</Typography>

        {!userPosts.length && (
          <Typography component="p">
            Momentan acest utilizator nu are nici un anunt
          </Typography>
        )}
      </Card>

      {userPosts.length !== 0 && (
        <Grid container spacing={1} style={{ marginTop: '10px' }}>
          {userPosts.map((post) => (
            <PostPreview post={post} key={post._id} />
          ))}
        </Grid>
      )}
    </Box>
  );
}

AdminUserPosts.propTypes = {
  userId: PropTypes.string.isRequired,
};

AdminUserPosts.defaultProps = {
  userId: '',
};

export default AdminUserPosts;
