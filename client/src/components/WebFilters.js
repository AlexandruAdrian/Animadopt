// System
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core';
import { Card } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Icons
import TuneIcon from '@material-ui/icons/Tune';
// Components
import FilterCategories from './FilterCategories';
import FilterLocations from './FilterLocations';
// Styles
import styles from '../styles/WebFilterStyles';
// Utils
import { isEqual } from 'lodash';

const WebFilters = React.memo(
  ({ locations, categories, onCategoryChange, onLocationChange }) => {
    const classes = makeStyles(styles)();

    return (
      <Card className={classes.webFilters}>
        <Box className={classes.webFiltersWrapper}>
          <Box className={classes.webFiltersTitle}>
            <TuneIcon />
            <Typography component="p">Filtre</Typography>
          </Box>
          <FilterCategories
            categories={categories}
            onCategoryChange={onCategoryChange}
          />
          <FilterLocations
            locations={locations}
            onLocationChange={onLocationChange}
          />
        </Box>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    const { categories: oldCategories, locations: oldLocations } = prevProps;
    const { categories: newCategories, locations: newLocations } = nextProps;

    return (
      isEqual(oldCategories, newCategories) &&
      isEqual(oldLocations, newLocations)
    );
  }
);

WebFilters.propTypes = {
  categories: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onLocationChange: PropTypes.func.isRequired,
};

export default WebFilters;
