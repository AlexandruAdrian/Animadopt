// System
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
// Icons
import TuneIcon from '@material-ui/icons/Tune';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Components
import FilterCategories from './FilterCategories';
import FilterLocations from './FilterLocations';
// Styles
import styles from '../styles/MobileFiltersStyles';

function MobileFilters({
  locations,
  categories,
  onCategoryChange,
  onLocationChange,
}) {
  const classes = makeStyles(styles)();

  return (
    <Card>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="filters-control"
          id="filters"
          classes={{
            root: classes.summary,
          }}
        >
          <TuneIcon />
          <Typography component="p">Filtre</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.details }}>
          <FilterCategories
            categories={categories}
            onCategoryChange={onCategoryChange}
          />
          <FilterLocations
            locations={locations}
            onLocationChange={onLocationChange}
          />
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}

MobileFilters.propTypes = {
  categories: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onLocationChange: PropTypes.func.isRequired,
};

export default MobileFilters;
