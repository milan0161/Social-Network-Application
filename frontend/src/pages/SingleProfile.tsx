import { Outlet, useParams } from 'react-router-dom';
import UserProfile from '../components/profile/UserProfile';
import { useGetSingleUserQuery } from '../features/user/api/userApiSlice';
import Loading from '../components/UI/Loading';

const SingleProfile = () => {
  const { id } = useParams();
  const { data, isSuccess, isLoading } = useGetSingleUserQuery(id!);

  let content;

  if (isLoading) {
    content = <Loading />;
  }
  if (isSuccess) {
    const userData = {
      id: data.user.id,
      firstname: data.user.firstname,
      lastname: data.user.lastname,
      mainImage: data.user.mainImage,
    };
    content = <UserProfile user={userData} />;
  }

  return (
    <>
      {content}
      <Outlet />
    </>
  );
};

export default SingleProfile;
