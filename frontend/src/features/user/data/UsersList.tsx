import React from 'react';
import { useGetAllUnfollowedQuery } from '../api/userApiSlice';
import Loading from '../../../components/UI/Loading';
import SingleUser from '../../../components/user/SingleUser';

const UsersList = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetAllUnfollowedQuery();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h2 className="text-center">{error.message}</h2>;
  }
  if (isSuccess) {
    return (
      <>
        {data.users.map((user) => {
          return <SingleUser key={user.id} user={user} />;
        })}
      </>
    );
  }

  return <></>;
};

export default UsersList;
