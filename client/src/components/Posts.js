// System
import React from 'react';
import PropTypes from 'prop-types';
// Components
import PostPreview from './PostPreview';
import Grid from '@material-ui/core/Grid';

function Posts({ posts, lastPostRef }) {
  console.log('posts: ', posts);
  return (
    <Grid item container xs={12} spacing={1} style={{ margin: '0 auto' }}>
      {posts.length > 0 &&
        posts.map((post, index) => {
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
        })}
    </Grid>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
