// System
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
// Components
import PostForm from '../../components/PostForm';
import Loading from '../../components/Loading';
import AddPostSuccess from '../../components/AddPostSuccess';
// Actions
import { addPost } from './actions';
import { resetRequestState } from '../../utils/request/actions';
// Styles
import styles from '../../styles/AddPostStyles';

function AddPost() {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const { response, isLoading } = useSelector((state) => state.request);

  useEffect(() => {
    return () => dispatch(resetRequestState());
  }, [dispatch]);

  const INITIAL_VALUES = {
    pictures: [],
    title: '',
    description: '',
    breed: '',
  };

  function handlePostSubmit(values) {
    const postFormData = new FormData();
    values.pictures.forEach((picture) =>
      postFormData.append('pictures', picture)
    );
    postFormData.append('title', values.title);
    postFormData.append('description', values.description);
    postFormData.append('breed', values.breed);
    postFormData.append('category', values.category);
    postFormData.append('location', values.location);
    dispatch(addPost(postFormData));
  }

  return (
    <Box className={classes.container}>
      <Card className={classes.card}>
        {response && !Object.keys(response).length && !isLoading ? (
          <PostForm
            initialValues={INITIAL_VALUES}
            submit={handlePostSubmit}
            buttonText={'Adauga'}
          />
        ) : !isLoading && response && response.success ? (
          <AddPostSuccess response={response} />
        ) : (
          <Loading />
        )}
      </Card>
    </Box>
  );
}

export default AddPost;
