// System
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
// Actions
import {
  addCategory,
  updateCategory,
  deleteCategory,
} from '../containers/Categories/actions';
// Styles
import styles from '../styles/CategoryModalStyles';
import FormControl from '@material-ui/core/FormControl';
import CustomButton from './CustomButton';

function CategoryModal({ open, onClose, editMode }) {
  const classes = makeStyles(styles)();
  const { selectedCategory } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    category: '',
    key: '',
    isDefault: false,
    numberOfPosts: 0,
  });

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    if (!category.category) {
      isValid = false;
      toast.error('Va rugam sa adaugati o descriere');
    }

    if (!category.key) {
      isValid = false;
      toast.error('Va rugam sa adaugati o cheie');
    }

    return isValid;
  };

  const handleAddCategory = () => {
    const isValid = validateForm();

    if (isValid) {
      dispatch(addCategory(category));
      onClose();
    }
  };

  const handleUpdateCategory = () => {
    const isValid = validateForm();

    if (isValid) {
      dispatch(updateCategory(category));
      onClose();
    }
  };

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(category._id));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <form className={classes.form}>
        <Box>
          <FormControl fullWidth>
            <TextField
              id="key"
              name="key"
              type={'text'}
              label={'Cheie'}
              aria-describedby={'key'}
              value={category.key}
              onChange={handleChange}
              InputProps={{
                classes: {
                  root: classes.inputRoot,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.inputRoot,
                },
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="category"
              name="category"
              type={'text'}
              label={'Descriere'}
              aria-describedby={'category'}
              value={category.category}
              onChange={handleChange}
              InputProps={{
                classes: {
                  root: classes.inputRoot,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.inputRoot,
                },
              }}
            />
          </FormControl>
        </Box>

        <Box className={classes.modalControls}>
          {!editMode && (
            <CustomButton
              dark
              text={'Adauga'}
              handler={handleAddCategory}
              size={'small'}
            />
          )}
          {editMode && (
            <>
              <CustomButton
                dark
                text={'Editeaza'}
                handler={handleUpdateCategory}
                size={'small'}
              />
              {!category.isDefault && category.numberOfPosts === 0 && (
                <CustomButton
                  danger
                  text={'Sterge'}
                  handler={handleDeleteCategory}
                  size={'small'}
                />
              )}
            </>
          )}
        </Box>
      </form>
    </Modal>
  );
}

CategoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default CategoryModal;
