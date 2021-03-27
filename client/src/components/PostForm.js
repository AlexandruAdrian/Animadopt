// System
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// Components
import CustomButton from './CustomButton';
import PostDropzone from './PostDropzone';
// Validations
import addPostValidationSchema from '../validators/addPostValidator';
// Actions
import { fetchCategories } from '../containers/Categories/actions';
// Utils
import { get } from 'lodash';
// Styles
import styles from '../styles/AddPostStyles';

function PostForm({ initialValues, submit, buttonText }) {
  const dispatch = useDispatch();
  const classes = makeStyles(styles)();
  const { categories } = useSelector((state) => state.categories);
  const { locations } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [categories]);

  if (!get(initialValues, '_id')) {
    initialValues['category'] = categories.length ? categories[0].category : '';
    initialValues['location'] = locations.length ? locations[0].county : '';
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setFieldError,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: addPostValidationSchema,
    validateOnMount: true,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => submit(values),
  });

  const handleFocus = (e) => {
    const { id } = e.target;
    setFieldError(id, '');
  };

  return (
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
            helperText={touched.title && errors.title ? errors.title : null}
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
            helperText={touched.breed && errors.breed ? errors.breed : null}
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
            error={!!(touched.category && errors.category)}
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
            error={!!(touched.location && errors.location)}
            classes={{
              selectMenu: classes.selectMenu,
            }}
          >
            {locations.map((county) => (
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

      <CustomButton dark text={buttonText} type="submit" />
    </form>
  );
}

PostForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default PostForm;
