// System
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// Styles
import styles from '../styles/FilterDetails';
import Grid from '@material-ui/core/Grid';

function FilterCategories({ categories, onCategoryChange }) {
  const classes = makeStyles(styles)();

  return (
    <Box className={classes.categoriesContainer}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" classes={{ root: classes.legend }}>
          Categorii:
        </FormLabel>
        <FormGroup className={classes.checkboxes}>
          <Grid container spacing={1}>
            {categories.map((category) => (
              <Grid item xs={6} md={4} key={`${category.key}-${category.id}`}>
                <FormControlLabel
                  onChange={onCategoryChange}
                  value={category.category}
                  classes={{ label: classes.checkboxLabel }}
                  control={<Checkbox color="primary" size="small" />}
                  label={category.category}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </FormControl>
    </Box>
  );
}

FilterCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default FilterCategories;
