import React, { useEffect } from 'react';
import Chat from '../components/profile/messages/Chat';
import openSocket from 'socket.io-client';

// import { soket } from '../features/messages/api/messageApi';
export const soket = openSocket('http://localhost:7000', { autoConnect: false });
const ChatPage: React.FC = () => {
  useEffect(() => {
    soket.connect();

    return () => {
      soket.disconnect();
    };
  }, []);

  return <Chat />;
};

export default ChatPage;
