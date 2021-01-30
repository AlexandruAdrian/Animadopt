// System
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import TabPicker from '../../components/TabPicker';
import AdminUserDetails from '../../components/AdminUserDetails';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Card, InputAdornment, TextField } from '@material-ui/core';
// Icons
import SearchIcon from '@material-ui/icons/Search';
// Actions
import { getUsers } from './actions';
// Constants
import {
  USER_ROLE_USER,
  USER_ROLE_ADMIN,
  USER_ROLE_OWNER,
  TAB_USER,
  TAB_ADMIN,
} from '../Dashboard/constants';
// Styles
import style from '../../styles/UsersStyle';

function Users() {
  const classes = makeStyles(style)();
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const [selectedTab, setSelectedTab] = useState(TAB_USER);
  const [query, setQuery] = useState({
    page: 1,
    searchTerm: '',
    role: USER_ROLE_USER,
  });

  function handleSearchTerm(e) {
    setQuery({
      ...query,
      searchTerm: e.target.value,
    });
  }

  const onTabChange = async (e, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    let role;
    if (selectedTab === TAB_USER) {
      role = USER_ROLE_USER;
    } else if (selectedTab === TAB_ADMIN) {
      role = USER_ROLE_ADMIN;
    } else {
      role = USER_ROLE_OWNER;
    }
    setQuery({
      ...query,
      role,
    });
  }, [selectedTab]);

  useEffect(() => {
    dispatch(getUsers(query));
  }, [query]);

  return (
    <Box className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <FormControl className={classes.searchControl}>
              <TextField
                id="searchTerm"
                aria-describedby="Search"
                value={query.searchTerm}
                onChange={handleSearchTerm}
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon className={classes.icon} fontSize="small" />
                    </InputAdornment>
                  ),
                  placeholder: 'Cauta dupa nume, prenume, email...',
                }}
              />
            </FormControl>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <TabPicker selectedTab={selectedTab} changeHandler={onTabChange} />
        </Grid>

        {users.map((user) => (
          <Grid item xs={12} md={6} lg={4} key={user._id}>
            <AdminUserDetails user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Users;
