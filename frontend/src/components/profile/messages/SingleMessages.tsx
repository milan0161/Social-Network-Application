import React from 'react';
import { SingleChatUser, SingleMessage } from '../../../features/messages/types';
import { InitalUserState } from '../../../features/auth/types';

interface SingleMessagesProps {
  msg: SingleMessage;
  imgContent: React.ReactNode;
  className: string;
}

const SingleMessages = ({ msg, imgContent, className }: SingleMessagesProps) => {
  let imageContent = imgContent;
  return (
    <li className={`w-full px-4 ${className}`}>
      <div className="flex flex-row items-center mb-2 gap-2">
        {imageContent}
        <p>{msg.sender.firstname}</p>
        <p>{msg.sender.lastname}</p>
      </div>
      <div className="my-2 px-2 rounded-xl msg_content">{msg.content}</div>
    </li>
  );
};

export default SingleMessages;
