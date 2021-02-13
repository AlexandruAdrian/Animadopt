// System
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
// Components
import PostDropzone from '../../components/PostDropzone';
import CustomButton from '../../components/CustomButton';
import Loading from '../../components/Loading';
import AddPostSuccess from '../../components/AddPostSuccess';
// Actions
import { fetchCounties, addPost } from './actions';
import { resetRequestState } from '../../utils/request/actions';
// Validations
import addPostValidationSchema from '../../validators/addPostValidator';
// Styles
import styles from '../../styles/AddPostStyles';

function AddPost() {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const { response, isLoading } = useSelector((state) => state.request);
  const { categories } = useSelector((state) => state.categories);
  const { counties } = useSelector((state) => state.counties);

  useEffect(() => {
    dispatch(fetchCounties());
    return () => dispatch(resetRequestState());
  }, []);

  const INITIAL_VALUES = {
    pictures: [],
    title: '',
    description: '',
    breed: '',
    category: categories[0].category,
    location: counties[0].county,
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setFieldError,
    handleSubmit,
  } = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: addPostValidationSchema,
    validateOnMount: true,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: handlePostSubmit,
  });

  function handlePostSubmit() {
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

  const handleFocus = (e) => {
    const { id } = e.target;
    setFieldError(id, '');
  };

  return (
    <Box className={classes.container}>
      <Card className={classes.card}>
        {response && !Object.keys(response).length && !isLoading ? (
          <form className={classes.form} onSubmit={handleSubmit}>
            <PostDropzone
              setFieldValue={setFieldValue}
              addedImages={values.pictures}
            />

            <Box className={classes.inputs}>
              <FormControl fullWidth>
                <TextField
                  id="title"
                  label="Titlu"
                  aria-describedby="Title"
                  error={!!(touched.title && errors.title)}
                  helperText={
                    touched.title && errors.title ? errors.title : null
                  }
                  value={values.title}
                  onChange={handleChange}
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabelRoot,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.inputRoot,
                    },
                    onFocus: handleFocus,
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  id="description"
                  label="Descriere"
                  aria-describedby="Description"
                  error={!!(touched.description && errors.description)}
                  helperText={
                    touched.description && errors.description
                      ? errors.description
                      : null
                  }
                  onChange={handleChange}
                  multiline
                  rowsMax={4}
                  value={values.description}
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabelRoot,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.inputRoot,
                    },
                    onFocus: handleFocus,
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  id="breed"
                  label="Rasa"
                  aria-describedby="Breed"
                  error={!!(touched.breed && errors.breed)}
                  helperText={
                    touched.breed && errors.breed ? errors.breed : null
                  }
                  onChange={handleChange}
                  value={values.breed}
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabelRoot,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.inputRoot,
                    },
                    onFocus: handleFocus,
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel className={classes.inputRoot} id="category-label">
                  Categorie
                </InputLabel>
                <Select
                  id="category"
                  name="category"
                  labelId="category-label"
                  aria-describedby="Category"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  value={values.category}
                  classes={{
                    selectMenu: classes.selectMenu,
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem
                      classes={{
                        root: classes.listItem,
                        selected: classes.selectedItem,
                      }}
                      value={category.category}
                      key={category.key}
                    >
                      {category.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel className={classes.inputRoot} id="location-label">
                  Localitatea
                </InputLabel>
                <Select
                  id="location"
                  name="location"
                  labelId="location-label"
                  aria-describedby="Location"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  value={values.location}
                  classes={{
                    selectMenu: classes.selectMenu,
                  }}
                >
                  {counties.map((county) => (
                    <MenuItem
                      classes={{
                        root: classes.listItem,
                        selected: classes.selectedItem,
                      }}
                      value={county.county}
                      key={county.key}
                    >
                      {county.county}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <CustomButton dark text="Adauga" type="submit" />
          </form>
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
