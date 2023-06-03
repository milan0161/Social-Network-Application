import { Link } from 'react-router-dom';
import PostComments from './PostComments';
import SingleComment from './SingleComment';
import { Post } from '../../features/post/types';
import { REACT_APP_BASE_URL } from '../../api/axios/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PostDate from './PostDate';
interface PostProps {
  post: Post;
}

const SinglePost = ({ post }: PostProps) => {
  return (
    <div className="border border-slate-300 w-1/2 mx-auto mt-8 rounded-lg ">
      <div className="w-full flex flex-col">
        <div className="flex flex-row px-2 my-2">
          {post.author.mainImage && (
            <img
              className="w-8 h-8 rounded-full mr-4"
              src={`${REACT_APP_BASE_URL}/${post.author.mainImage}`}
              alt={post.author.firstname}
            />
          )}
          {!post.author.mainImage && (
            <div className="w-8 h-8 rounded-full mr-2 border border-slate-300 flex items-center justify-center">
              <FontAwesomeIcon className="m-auto" icon={faUser} />{' '}
            </div>
          )}
          <Link to={`/profile/${post.author.id}`} className="mr-2 cursor-pointer">
            {post.author.firstname} {post.author.lastname}
          </Link>
        </div>
        <PostDate date={post.createdAt} />
      </div>
      <div className=" w-full h-full 2xl:h-1/2 border-t-slate-300 border 2xl:pb-6">
        <p className="ml-4">{post.content}</p>
        {post.image[0] && (
          <img
            className="w-full mx-auto h-full 2xl:w-1/2 2xl:h-full"
            src={`${REACT_APP_BASE_URL}/${post.image[0].path}`}
            alt="dummy"
          />
        )}
      </div>
      <PostComments postId={post.id} />
      {post.comments &&
        post.comments.map((com) => {
          return <SingleComment key={com.id} comment={com} />;
        })}
    </div>
  );
};

export default SinglePost;
