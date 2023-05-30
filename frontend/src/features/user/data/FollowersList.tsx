import { useGetFollowersQuery } from '../api/userApiSlice';
import Loading from '../../../components/UI/Loading';
import SingleUser from '../../../components/user/SingleUser';
import { useParams } from 'react-router-dom';
// import { useAppSelector } from '../../../app/hooks';

const FollowersList = () => {
  // const user = useAppSelector((state) => state.auth.user);
  const { id } = useParams();

  const { data, isLoading, isSuccess, isError, error } = useGetFollowersQuery(id!);

  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isSuccess) {
    if (data.message) {
      content = <p className="text-center">{data.message}</p>;
    }
    content = (
      <>
        {data.followers.map((user) => {
          return <SingleUser key={user.id} user={user} />;
        })}
      </>
    );
  }
  if (isError) {
    content = <h2 className="text-center mt-3">{error.message}</h2>;
  }
  return <>{content}</>;
};

export default FollowersList;
