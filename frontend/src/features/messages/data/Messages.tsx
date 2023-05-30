import { useGetChatQuery } from '../api/messageApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Loading from '../../../components/UI/Loading';
import SingleMessages from '../../../components/profile/messages/SingleMessages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { REACT_APP_BASE_URL } from '../../../api/axios/axios';
import { setParcipient } from '../messagesSlice';

const MessagesList = () => {
  const parcipient = useAppSelector((state) => state.msg.parcipient);
  const loggedUser = useAppSelector((state) => state.auth.user);
  const { data, isSuccess, isLoading, isError, error } = useGetChatQuery(parcipient.id);
  const dispatch = useAppDispatch();

  let content;
  let imgContent;

  if (isLoading) {
    content = <Loading />;
  }
  if (isSuccess && data.chat !== null) {
    content = data.chat.messages.map((msg) => {
      let klasa: string = '';
      imgContent = (
        <div className="w-8 h-8 border p-4 border-slate-500 rounded-full flex items-center justify-center">
          <FontAwesomeIcon size="1x" icon={faUser} />
        </div>
      );

      if (msg.sender.mainImage !== null) {
        imgContent = (
          <img
            className="w-8 h-8 rounded-full"
            src={`${REACT_APP_BASE_URL}/${msg.sender.mainImage}`}
            alt={loggedUser.firstname}
          />
        );
      }

      if (msg.sender.id === parcipient.id) {
        klasa = 'percipient';
      } else {
        klasa = 'logged_user';
      }

      return <SingleMessages className={klasa} key={msg.id} imgContent={imgContent} msg={msg} />;
    });
  } else {
    content = <p className="text-center">{`You have no messages with ${parcipient.firstname} yet`}</p>;
  }
  if (isError) {
    content = <p>{error.message}</p>;
  }
  return (
    <>
      {parcipient && (
        <div className="flex flex-row border border-b-red-300 gap-2 px-2 py-2 items-center">
          {parcipient.mainImage && (
            <img className="w-8 h-8 rounded-full" src={`${REACT_APP_BASE_URL}/${parcipient.mainImage}`} />
          )}
          <p>{parcipient.firstname}</p>
          <p>{parcipient.lastname}</p>
        </div>
      )}
      <ul className="border-b-2 border-slate-400 h-full list-none w-full mt-2 overflow-y-scroll">{content}</ul>
    </>
  );
};

export default MessagesList;
