// System
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// Components
import MobileAddPostButton from '../../components/MobileAddPostButton';
import SearchBar from '../../components/SearchBar';
import TabPicker from '../../components/TabPicker';
import Posts from '../../components/Posts';
import MobileFilters from '../../components/MobileFilters';
// Constants
import {
  STATUS_TABS,
  ADOPTED_TABS,
  TAB_NOT_ADOPTED,
  TAB_APPROVED,
  TAB_PENDING,
  TAB_REJECTED,
  IS_ADOPTED,
  IS_NOT_ADOPTED,
  STATUS_APPROVED,
  STATUS_PENDING,
  STATUS_REJECTED,
} from './constants';
// Styles
import styles from '../../styles/PostsPageStyles';
import WebFilters from '../../components/WebFilters';

function PostsPage({ posts, query, setQuery, tabs, canAdd }) {
  const classes = makeStyles(styles)();

  const { categories } = useSelector((state) => state.categories);
  const { locations } = useSelector((state) => state.dashboard);

  const [selectedStatusTab, setSelectedStatusTab] = useState(TAB_APPROVED);
  const [selectedAdoptionTab, setSelectedAdoptionTab] = useState(
    TAB_NOT_ADOPTED
  );

  const onStatusTabChange = (e, newValue) => {
    setSelectedStatusTab(newValue);
    if (newValue === TAB_REJECTED || newValue === TAB_PENDING) {
      setSelectedAdoptionTab(TAB_NOT_ADOPTED);
      setQuery({
        ...query,
        adopted: IS_NOT_ADOPTED,
        status: newValue === TAB_REJECTED ? STATUS_REJECTED : STATUS_PENDING,
      });
    } else {
      setQuery({
        ...query,
        status: STATUS_APPROVED,
      });
    }
  };

  const onAdoptionTabChange = (e, newValue) => {
    if (selectedStatusTab === TAB_APPROVED) {
      setSelectedAdoptionTab(newValue);
      setQuery({
        ...query,
        adopted: IS_ADOPTED,
      });
    } else {
      setQuery({
        ...query,
        adopted: IS_NOT_ADOPTED,
      });
    }
  };

  const onCategoryChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      const categories = [...query.category, value];
      setQuery({
        ...query,
        category: categories,
      });
    } else {
      const filteredCategories = query.category.filter(
        (category) => category !== value
      );
      setQuery({
        ...query,
        category: filteredCategories,
      });
    }
  };

  const onLocationChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      const locations = [...query.location, value];
      setQuery({
        ...query,
        location: locations,
      });
    } else {
      const filteredLocations = query.location.filter(
        (location) => location !== value
      );
      setQuery({
        ...query,
        location: filteredLocations,
      });
    }
  };

  function handleSearchTerm(e) {
    setQuery({
      ...query,
      search: e.target.value,
    });
  }

  return (
    <Box className={classes.postsPage}>
      <Box className={classes.container}>
        <Grid container spacing={1}>
          {/* Search bar */}
          <Grid item xs={12}>
            <SearchBar
              value={query.search}
              handler={handleSearchTerm}
              placeholder="Cauta dupa titlu, rasa..."
            />
          </Grid>
          {/* Status tabs */}
          {tabs.status && (
            <Grid item xs={12}>
              <TabPicker
                selectedTab={selectedStatusTab}
                changeHandler={onStatusTabChange}
                tabs={STATUS_TABS}
              />
            </Grid>
          )}
          {/* Adopted tabs */}
          {tabs.adopted && (
            <Grid item xs={12}>
              <TabPicker
                selectedTab={selectedAdoptionTab}
                changeHandler={onAdoptionTabChange}
                tabs={ADOPTED_TABS}
              />
            </Grid>
          )}
          {/* Filters */}
          <Grid item xs={12} className={classes.mobileFilters}>
            <MobileFilters
              categories={categories}
              locations={locations}
              onCategoryChange={onCategoryChange}
              onLocationChange={onLocationChange}
            />
          </Grid>

          {canAdd && <MobileAddPostButton />}

          {/* Results */}
          <Posts posts={posts} />
        </Grid>
      </Box>
      <WebFilters
        categories={categories}
        locations={locations}
        onCategoryChange={onCategoryChange}
        onLocationChange={onLocationChange}
      />
    </Box>
  );
}

PostsPage.propTypes = {
  posts: PropTypes.array.isRequired,
  query: PropTypes.object.isRequired,
  setQuery: PropTypes.func.isRequired,
  tabs: PropTypes.object.isRequired,
  canAdd: PropTypes.bool,
};

PostsPage.defaultProps = {
  posts: [],
  tabs: {
    status: true,
    adopted: true,
  },
  canAdd: true,
};

export default PostsPage;
