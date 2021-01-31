// System
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
import Category from '../../components/Category';
import CategoryModal from '../../components/CategoryModal';
// Actions
import { fetchCategories, setSelectedCategory } from './actions';
// Styles
import styles from '../../styles/CategoriesStyles';
import CustomButton from '../../components/CustomButton';
import { Paper } from '@material-ui/core';

function Categories() {
  const classes = makeStyles(styles)();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { categories, isLoading } = useSelector((state) => state.categories);

  const handleCloseModal = () => {
    setModalOpen(false);
    dispatch(setSelectedCategory({}));
    setEditMode(false);
  };

  const handleOpenEditModal = (e, category) => {
    if (!category.isDefault) {
      setModalOpen(true);
      setEditMode(true);
      dispatch(setSelectedCategory(category));
    }
  };

  const handleOpenAddModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <Box className={classes.container}>
      <Paper elevation={3}>
        <Grid container spacing={1} className={classes.grid}>
          <Grid container item xs={12}>
            <Grid item xs={9}>
              Categorie
            </Grid>
            <Grid item xs={3}>
              Anunturi
            </Grid>
          </Grid>
          {categories.map((category) => (
            <Category
              category={category}
              handleClick={handleOpenEditModal}
              key={category.key}
            />
          ))}
        </Grid>
      </Paper>

      <Paper elevation={3} className={classes.categoriesAction}>
        <CustomButton
          text={'Adauga'}
          dark
          handler={handleOpenAddModal}
          size="small"
        />
      </Paper>

      <CategoryModal
        open={modalOpen}
        onClose={handleCloseModal}
        editMode={editMode}
      />
    </Box>
  );
}

export default Categories;
