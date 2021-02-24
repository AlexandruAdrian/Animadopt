// System
import React from 'react';
import PropTypes from 'prop-types';
// Components
import PostPreview from './PostPreview';
import Grid from '@material-ui/core/Grid';

function Posts({ posts }) {
  return (
    <Grid item container xs={12} spacing={1} style={{ margin: '0 auto' }}>
      {posts.map((post) => (
        <PostPreview post={post} key={post._id} />
      ))}
    </Grid>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
