// System
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
// Components
import PostPreview from './PostPreview';
// Style
import style from '../styles/PostsStyles';

const Posts = ({ posts, lastPostRef }) => {
  const classes = makeStyles(style)();

  return (
    <Grid item container xs={12} spacing={1} className={classes.container}>
      {posts.length > 0
        ? posts.map((post, index) => {
            if (posts.length === index + 1) {
              return (
                <PostPreview
                  post={post}
                  key={post._id}
                  lastPostRef={lastPostRef}
                />
              );
            } else {
              return <PostPreview post={post} key={post._id} />;
            }
          })
        : null}
    </Grid>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
