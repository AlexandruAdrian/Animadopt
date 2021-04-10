// System
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { fetchDashboardPosts } from '../containers/Dashboard/actions';
// Constants
import {
  IS_NOT_ADOPTED,
  STATUS_APPROVED,
} from '../containers/PostsPage/constants';
// Components
import PostsPage from '../containers/PostsPage';

function DashboardPosts() {
  const dispatch = useDispatch();
  const { posts, nextPostsPage } = useSelector((state) => state.dashboard);

  const [query, setQuery] = useState({
    page: 1,
    search: '',
    adopted: IS_NOT_ADOPTED,
    status: STATUS_APPROVED,
    category: [],
    location: [],
  });

  const tabs = {
    adopted: false,
    status: false,
  };

  useEffect(() => {
    dispatch(
      fetchDashboardPosts({
        ...query,
        category: query.category.join(','),
        location: query.location.join(','),
      })
    );
  }, [query]);

  return (
    <PostsPage
      posts={posts}
      query={query}
      setQuery={setQuery}
      tabs={tabs}
      canAdd={false}
      nextPostsPage={nextPostsPage}
    />
  );
}

export default DashboardPosts;
