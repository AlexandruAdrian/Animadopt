// React
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Card, InputAdornment, TextField } from '@material-ui/core';
// Icons
import SearchIcon from '@material-ui/icons/Search';
// Styles
import styles from '../styles/SearchBarStyles';

function SearchBar({ value, handler, placeholder }) {
  const classes = makeStyles(styles)();

  return (
    <Card className={classes.card}>
      <FormControl className={classes.searchControl}>
        <TextField
          id="searchTerm"
          aria-describedby="Search"
          value={value}
          onChange={handler}
          InputProps={{
            classes: {
              root: classes.inputRoot,
            },
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon className={classes.icon} fontSize="small" />
              </InputAdornment>
            ),
            placeholder: placeholder,
          }}
        />
      </FormControl>
    </Card>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchBar;
