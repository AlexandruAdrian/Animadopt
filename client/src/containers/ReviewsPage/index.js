// System
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import PostsPage from '../PostsPage';
// Actions
import { getReviewPosts } from './actions';
// Constants
import { IS_NOT_ADOPTED, STATUS_PENDING } from '../PostsPage/constants';

function ReviewsPage() {
  const dispatch = useDispatch();
  const { posts, isLoading, nextPostsPage } = useSelector(
    (state) => state.reviewPosts
  );
  const tabs = {
    status: false,
    adopted: false,
  };

  const [query, setQuery] = useState({
    page: 1,
    search: '',
    adopted: IS_NOT_ADOPTED,
    status: STATUS_PENDING,
    category: [],
    location: [],
  });

  useEffect(() => {
    const searchAfterTyping = setTimeout(() => {
      dispatch(
        getReviewPosts({
          ...query,
          category: query.category.join(','),
          location: query.location.join(','),
        })
      );
    }, 500);

    return () => {
      clearTimeout(searchAfterTyping);
    };
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

export default ReviewsPage;
