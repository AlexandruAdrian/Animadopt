// System
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// Material UI
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
// Components
import PostViewMode from '../../components/PostViewMode';
import PostEditMode from '../../components/PostEditMode';
// Actions
import { getPost } from './actions';
// Styles
import styles from '../../styles/PostStyles';

function Post({ selectedPost, loggedUser }) {
  const classes = makeStyles(styles)();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!selectedPost) {
      dispatch(getPost(id));
    }
  }, [dispatch]);

  return (
    <Box className={classes.postPage}>
      {editMode ? (
        <PostEditMode post={selectedPost} />
      ) : (
        selectedPost && (
          <PostViewMode
            post={selectedPost}
            user={loggedUser}
            setEditMode={setEditMode}
          />
        )
      )}
    </Box>
  );
}

Post.propTypes = {
  selectedPost: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
};

export default Post;
