// System
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import PostsPage from '../containers/PostsPage';
// Actions
import { fetchUserPosts } from '../containers/PostsPage/actions';
// Constants
import {
  IS_NOT_ADOPTED,
  STATUS_APPROVED,
} from '../containers/PostsPage/constants';

function UserPosts() {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.userPosts);
  const tabs = {
    adopted: true,
    status: true,
  };

  const [query, setQuery] = useState({
    page: 1,
    search: '',
    adopted: IS_NOT_ADOPTED,
    status: STATUS_APPROVED,
    category: [],
    location: [],
  });

  useEffect(() => {
    dispatch(
      fetchUserPosts({
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
      canAdd={true}
    />
  );
}

export default UserPosts;
