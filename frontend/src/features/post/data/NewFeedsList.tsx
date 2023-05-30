import React from 'react';
import { useGetNewFeedsQuery } from '../api/postApi';
import Loading from '../../../components/UI/Loading';
import SinglePost from '../../../components/post/SinglePost';

const NewFeedsList = () => {
  const { data: posts, isError, error, isSuccess, isLoading } = useGetNewFeedsQuery();
  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    content = <h2 className="text-center mt-10">{error.message}</h2>;
  }
  if (isSuccess && posts) {
    content = posts.posts.map((post) => <SinglePost key={post.id} post={post} />);
  }

  return <>{content}</>;
};

export default NewFeedsList;
