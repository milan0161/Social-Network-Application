import { useCreateCommentMutation } from '../../features/post/api/postApi';
import React, { useState } from 'react';

interface CommentProps {
  postId: string;
}

const PostComments = ({ postId }: CommentProps) => {
  const [content, setContent] = useState<string>('');
  const [createComment, { isError, error, isSuccess }] = useCreateCommentMutation();

  const contentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const createCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim().length === 0) {
      return;
    }
    createComment({ id: postId, content: content });
    setContent('');
  };
  if (isSuccess) {
    //Ubaci Toast Message
    console.log('Uspesno');
  }
  if (isError) {
    console.log(error?.message);
  }

  return (
    <div className="comment w-full flex flex-col m-0 p-0">
      {isError && <p className="text-center text-red-500">{error?.message}</p>}
      <form onSubmit={createCommentHandler} className=" w-full">
        <div>
          <textarea
            value={content}
            onChange={contentHandler}
            placeholder="Place for comment"
            className="w-full h-20 m-0"
            name="content"
          />
        </div>
        <div className="w-full flex justify-center">
          <button className="w-1/2 border border-slate-300 rounded bg-blue-400 text-white hover:bg-blue-300 transition">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostComments;
