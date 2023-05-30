import React from 'react';
import { useGetUserPostsQuery } from '../api/postApi';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/UI/Loading';
import SinglePost from '../../../components/post/SinglePost';

const UserPostList = () => {
  const { id } = useParams();
  const { data, isError, error, isSuccess, isLoading } = useGetUserPostsQuery(id!);

  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    content = <h2 className="text-center mt-10">{error.message}</h2>;
  }
  if (isSuccess && data) {
    content = data.posts.map((post) => {
      return <SinglePost key={post.id} post={post} />;
    });
  }

  return <>{content}</>;
};

export default UserPostList;
