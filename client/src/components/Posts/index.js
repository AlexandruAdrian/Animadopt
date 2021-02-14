// System
import React from 'react';
import PropTypes from 'prop-types';

function Posts({ posts }) {
  return <div>posts</div>;
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Posts;
