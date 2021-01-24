// System
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import AdminUserDetails from '../../components/AdminUserDetails';
import BanModal from '../../components/BanModal';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Icons
import SearchIcon from '@material-ui/icons/Search';
// Actions
import { getUsers } from './actions';
// Constants
import {
  USER_ROLE_USER,
  USER_ROLE_ADMIN,
  USER_ROLE_OWNER,
} from '../Dashboard/constants';
// Styles
import style from '../../styles/UsersStyle';
import { Card, InputAdornment, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

function Users() {
  const classes = makeStyles(style)();
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [query, setQuery] = useState({
    page: 1,
    searchTerm: '',
    role: USER_ROLE_USER,
  });
  const [openBanModal, setOpenBanModal] = useState(false);

  function handleSearchTerm(e) {
    setQuery({
      ...query,
      searchTerm: e.target.value,
    });
  }

  const handleCloseBanModal = () => {
    setOpenBanModal(false);
  };

  const handleOpenBanModal = () => {
    setOpenBanModal(true);
  };

  useEffect(() => {
    dispatch(getUsers(query));
  }, []);

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
                  placeholder: 'Cauta',
                }}
              />
            </FormControl>
          </Card>
        </Grid>

        {users.map((user) => (
          <Grid item xs={12} md={6} lg={4} key={user._id}>
            <AdminUserDetails
              user={user}
              openBanModal={handleOpenBanModal}
              setUserId={setSelectedUserId}
            />
          </Grid>
        ))}
      </Grid>

      <BanModal
        open={openBanModal}
        onClose={handleCloseBanModal}
        userId={selectedUserId}
      />
    </Box>
  );
}

export default Users;
