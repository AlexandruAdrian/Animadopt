// System
import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Card } from '@material-ui/core';
// Components
import PostForm from './PostForm';
// Actions
import { updatePost } from '../containers/Post/actions';
// Styles
import styles from '../styles/PostStyles';

function PostEditMode({ post }) {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const history = useHistory();

  function handleEditSubmit(values) {
    const postFormData = new FormData();
    values.pictures.forEach((picture) =>
      postFormData.append('pictures', picture)
    );
    postFormData.append('title', values.title);
    postFormData.append('description', values.description);
    postFormData.append('breed', values.breed);
    postFormData.append('category', values.category);
    postFormData.append('location', values.location);
    dispatch(updatePost(values._id, postFormData, history));
  }

  return (
    <Box className={classes.container}>
      <Card className={classes.editFormContainer}>
        <PostForm
          submit={handleEditSubmit}
          buttonText={'Editeaza'}
          initialValues={post}
        />
      </Card>
    </Box>
  );
}

export default PostEditMode;
