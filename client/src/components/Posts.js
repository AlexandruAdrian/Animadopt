// System
import React from 'react';
import PropTypes from 'prop-types';
// Components
import PostPreview from './PostPreview';

function Posts({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <PostPreview post={post} key={post.id} />
      ))}
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
