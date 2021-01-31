// System
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// Styles
import styles from '../styles/CategoryStyles';

function Category({ category, handleClick }) {
  const classes = makeStyles(styles)();

  return (
    <Grid
      container
      item
      xs={12}
      className={classes.category}
      onClick={(e) => handleClick(e, category)}
      key={category.key}
    >
      <Grid item xs={9}>
        <Typography component="p">{category.category}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography component="p">{category.numberOfPosts}</Typography>
      </Grid>
    </Grid>
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Category;
