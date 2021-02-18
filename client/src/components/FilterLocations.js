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

function FilterLocations({ locations, onLocationChange }) {
  const classes = makeStyles(styles)();

  return (
    <Box className={classes.locationsContainer}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" classes={{ root: classes.legend }}>
          Localitati:
        </FormLabel>
        <FormGroup className={classes.checkboxes}>
          <Grid container spacing={1}>
            {locations.map((location) => (
              <Grid
                item
                xs={6}
                md={4}
                lg={12}
                key={`${location.key}-${location.id}`}
              >
                <FormControlLabel
                  onChange={onLocationChange}
                  value={location.county}
                  classes={{ label: classes.checkboxLabel }}
                  control={<Checkbox color="primary" size="small" />}
                  label={location.county}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </FormControl>
    </Box>
  );
}

FilterLocations.propTypes = {
  locations: PropTypes.array.isRequired,
  onLocationChange: PropTypes.func.isRequired,
};

export default FilterLocations;
