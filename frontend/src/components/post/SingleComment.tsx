import { Comment } from '../../features/post/types';
import { REACT_APP_BASE_URL } from '../../api/axios/axios';
import { Link } from 'react-router-dom';
import { ProfilePic } from '../icons/ProfilePic';
interface CommentProps {
  comment: Comment;
}
const SingleComment = ({ comment }: CommentProps) => {
  const baseUrl = REACT_APP_BASE_URL;
  const mainImg = `${baseUrl}/${comment.author.mainImage}`;
  let imageContent;

  if (mainImg.includes('null')) {
    imageContent = (
      <div className="w-8 h-8 rounded-full border border-slate-900 mr-4 hover:scale-110 transition duration-">
        <ProfilePic className="w-8 h-8 rounded-full mr-4 hover:scale-110 transition duration-300" />
      </div>
    );
  } else {
    imageContent = (
      <img
        className="w-8 h-8 rounded-full mr-4 hover:scale-110 transition duration-300"
        src={mainImg}
        alt={comment.author.firstname}
        loading="lazy"
      />
    );
  }

  return (
    <div className="border border-slate-400 rounded bg-slate-100 py-2">
      <div className="w-full flex flex-col">
        <div className="flex flex-row px-2 my-2">
          {imageContent}
          <Link to={`/profile/${comment.author.id}`} className="mr-2 text-black">
            {comment.author.firstname} {comment.author.lastname}
          </Link>
        </div>
        <p className="px-2 text-slate-400">12/05/2023</p>
      </div>
      <div className="pl-2">
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default SingleComment;
