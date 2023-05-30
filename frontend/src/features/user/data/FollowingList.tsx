import React from 'react';
import { useGetFollowingQuery } from '../api/userApiSlice';
import Loading from '../../../components/UI/Loading';
import SingleUser from '../../../components/user/SingleUser';
import { useParams } from 'react-router-dom';

const FollowingList = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError, error, status } = useGetFollowingQuery(id!);

  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isSuccess) {
    content = (
      <>
        {data.following.map((user) => (
          <SingleUser key={user.id} user={user} />
        ))}
      </>
    );
  }
  if (isError) {
    content = <h2>{error.message}</h2>;
  }
  return <>{content}</>;
};

export default FollowingList;
