// System
import React, { useState } from 'react';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
import MobileAddPostButton from '../../components/MobileAddPostButton';
import SearchBar from '../../components/SearchBar';
import TabPicker from '../../components/TabPicker';
// Constants
import {
  STATUS_TABS,
  ADOPTED_TABS,
  TAB_NOT_ADOPTED,
  TAB_APPROVED,
  TAB_PENDING,
  TAB_REJECTED,
  TAB_ADOPTED,
} from './constants';
// Styles
import styles from '../../styles/PostsStyles';

function Posts() {
  const classes = makeStyles(styles)();

  const [selectedStatusTab, setSelectedStatusTab] = useState(TAB_APPROVED);
  const [selectedAdoptionTab, setSelectedAdoptionTab] = useState(TAB_ADOPTED);

  const onStatusTabChange = (e, newValue) => {
    setSelectedStatusTab(newValue);
    if (newValue === TAB_PENDING || newValue === TAB_REJECTED) {
      setSelectedAdoptionTab(TAB_NOT_ADOPTED);
    }
  };

  const onAdoptionTabChange = (e, newValue) => {
    if (selectedStatusTab === TAB_APPROVED) {
      setSelectedAdoptionTab(newValue);
    }
  };

  return (
    <Box className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <SearchBar
            value={''}
            handler={() => {}}
            placeholder="Cauta dupa titlu, rasa..."
          />
        </Grid>

        <Grid item xs={12}>
          <TabPicker
            selectedTab={selectedStatusTab}
            changeHandler={onStatusTabChange}
            tabs={STATUS_TABS}
          />
        </Grid>

        <Grid item xs={12}>
          <TabPicker
            selectedTab={selectedAdoptionTab}
            changeHandler={onAdoptionTabChange}
            tabs={ADOPTED_TABS}
          />
        </Grid>
      </Grid>

      <MobileAddPostButton />
    </Box>
  );
}

export default Posts;
