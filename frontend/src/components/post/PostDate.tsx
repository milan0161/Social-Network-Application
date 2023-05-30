import React from 'react';

interface DateProps {
  date: Date;
}

const PostDate = ({ date }: DateProps) => {
  const postDate = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return <p className="px-2 text-slate-400 cursor-pointer">{postDate}</p>;
};

export default PostDate;
