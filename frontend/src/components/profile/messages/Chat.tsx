import ChatList from './ChatList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useRef } from 'react';
import MessagesList from '../../../features/messages/data/Messages';

import { useSendMessageMutation } from '../../../features/messages/api/messageApi';
import { useAppSelector } from '../../../app/hooks';
import { soket } from '../../../pages/ChatPage';

// interface Parcipient {
//   id: string;
//   firstname: string;
//   lastname: string;
//   mainImage: string;
// }

const Chat = () => {
  const percipient = useAppSelector((state) => state.msg.parcipient);

  const msgRef = useRef<HTMLInputElement>(null);

  const [sendMsg, { isLoading, isSuccess }] = useSendMessageMutation();

  const sendMsgHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    sendMsg({ content: msgRef.current!.value, id: percipient.id });
    // soket.emit('messageSent', {
    //   message: msgRef.current?.value,
    //   to: percipient.id,
    // });
    msgRef.current!.value = '';
    msgRef.current?.focus();
  };
  const searchFriendHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    // console.log(e.target.value);
  };

  return (
    <section className="flex flex-row w-full max-h-screen h-[92vh]">
      <div className="left_section">
        {/* <div className="border-b-2 border-slate-300 flex flex-col items-center justify-center"> */}
        <form className="border-b-2 border-slate-300 flex flex-col items-center justify-center">
          <label className="text-slate-600" htmlFor="search_chat">
            Search friends to chat
          </label>
          <input onChange={searchFriendHandler} id="search_chat" className="w-3/4" type="search" />
        </form>
        {/* </div> */}
        <ChatList />
      </div>
      <div className="right_section">
        <div className="bg-white w-full h-5/6">
          <MessagesList />
        </div>
        <div className=" flex flex-row items-center justify-center">
          <input
            // value={msgRef.current?.value}
            ref={msgRef}
            placeholder="type your message"
            className="w-3/4 mr-4"
            type="text"
          />
          <button onClick={sendMsgHandler} className="border border-slate-300 p-2 rounded-full">
            <FontAwesomeIcon className="rotate-45 h-6" icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
