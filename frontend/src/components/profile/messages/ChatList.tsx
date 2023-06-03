import React from 'react';
import SingleChat from './SingleChat';
import { useGetAllChatsQuery } from '../../../features/messages/api/messageApi';
import Loading from '../../UI/Loading';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setParcipient } from '../../../features/messages/messagesSlice';

const ChatList: React.FC = () => {
  const { isLoading, isSuccess, isError, error } = useGetAllChatsQuery();
  const dispatch = useAppDispatch();
  const chatList = useAppSelector((state) => state.msg.chats);
  const parcipient = useAppSelector((state) => state.msg.parcipient);
  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isSuccess) {
    if (chatList) {
      content = (
        <ul>
          {chatList.map((chat, index) => {
            return <SingleChat key={index} chat={chat} />;
          })}
        </ul>
        // <ul className="flex flex-col">
        //   {data.allChats.map((sChat, index) => {
        //     return <SingleChat key={index} chat={sChat} />;
        //   })}
        // </ul>
      );
      if (parcipient.id === undefined) {
        // dispatch(setParcipient({ parcipient: chatList[0].users[0] }));
      }
    }
  }

  return (
    <>
      {content}
      {/* <ul>
        {chatList.map((chat, index) => {
          return <SingleChat key={index} chat={chat} />;
        })}
      </ul> */}
    </>
  );
};

export default ChatList;
