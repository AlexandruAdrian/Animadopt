// System
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import TabPicker from '../../components/TabPicker';
import AdminUserDetails from '../../components/AdminUserDetails';
import SearchBar from '../../components/SearchBar';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Actions
import { getUsers } from './actions';
// Constants
import {
  USER_ROLE_USER,
  USER_ROLE_ADMIN,
  USER_ROLE_OWNER,
  TAB_USER,
  TAB_ADMIN,
  TAB_LABELS,
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

  const onTabChange = (e, newValue) => {
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
          <SearchBar
            value={query.searchTerm}
            handler={handleSearchTerm}
            placeholder={'Cauta dupa nume, prenume, email...'}
          />
        </Grid>

        <Grid item xs={12}>
          <TabPicker
            selectedTab={selectedTab}
            changeHandler={onTabChange}
            tabs={TAB_LABELS}
          />
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
