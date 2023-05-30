import UserPostList from '../../features/post/data/UserPostList';
import PostForm from '../../components/form/PostForm';

const UserPosts = () => {
  return (
    <>
      <PostForm />
      <UserPostList />
    </>
  );
};

export default UserPosts;
