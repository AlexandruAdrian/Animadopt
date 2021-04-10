// React
import React, { useState, useEffect } from 'react';
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
  const [searchInput, setSearchInput] = useState('');
  const ENTER_KEY = 13;

  useEffect(() => {
    if (value) {
      setSearchInput(value);
    }
  }, [value]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
      e.preventDefault();
      handler(searchInput);
    }
  };

  const handleBlur = (e) => {
    handler(searchInput);
  };

  return (
    <Card className={classes.card}>
      <FormControl className={classes.searchControl}>
        <TextField
          id="searchTerm"
          aria-describedby="Search"
          value={searchInput}
          onChange={handleSearchInput}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
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
