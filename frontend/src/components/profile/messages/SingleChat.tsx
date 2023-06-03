import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { SingleChat as SchatProp } from '../../../features/messages/types';
import { REACT_APP_BASE_URL } from '../../../api/axios/axios';
import { useAppDispatch } from '../../../app/hooks';
import { setParcipient } from '../../../features/messages/messagesSlice';
import { soket } from '../../../pages/ChatPage';

interface SingleChatProps<T> {
  chat: T;
}

const SingleChat = <T extends SchatProp>({ chat }: SingleChatProps<T>) => {
  const dispatch = useAppDispatch();

  const onSingleChatHandler = () => {
    dispatch(setParcipient({ parcipient: chat.users[0] }));
  };

  let imageContent;
  if (chat.users[0].mainImage === null) {
    imageContent = (
      <div className="w-8 h-8 border p-4 border-slate-500 rounded-full flex items-center justify-center">
        <FontAwesomeIcon size="1x" icon={faUser} />
      </div>
    );
  } else {
    imageContent = (
      <div className="">
        <img className="w-8 h-8 rounded-full" src={`${REACT_APP_BASE_URL}/${chat.users[0].mainImage}`} />
      </div>
    );
  }
  return (
    <li className="flex flex-row items-center gap-8 my-2 mx-2 border border-slate-400 py-1 px-2 rounded">
      {imageContent}
      <button onClick={onSingleChatHandler}>
        <span className="mx-2">{chat.users[0].firstname}</span>
        <span>{chat.users[0].lastname}</span>
      </button>
    </li>
  );
};

export default SingleChat;
