import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import removeTokens from '../../utils/removeTokens';
import { setIsAuth } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const MenuList: React.FC<{ onShow: () => void }> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const logOutHandler = () => {
    removeTokens();
    dispatch(setIsAuth(false));
    navigate('/login');
    props.onShow();
  };

  const settingsHandler = () => {
    navigate(`settings`);
    props.onShow();
  };

  const profileHandler = () => {
    navigate(`profile/${user.id}`);
    props.onShow();
  };
  return (
    <div className="absolute top-14 -right-4 border flex flex-col text-white bg-slate-800 rounded-lg w-96">
      <div className="bg-slate-800 w-12 h-12 absolute right-12 top-1 -translate-y-3 z-0 origin-bottom-right rotate-45 2xl:right-40 "></div>
      <button
        className=" w-full flex items-center gap-4 px-3 py-2 hover:bg-slate-500 transition rounded  z-50"
        onClick={profileHandler}
      >
        <FontAwesomeIcon size="2x" icon={faUserCircle} />
        <span>Profile</span>
      </button>
      <button
        onClick={settingsHandler}
        className="w-full flex items-center gap-4 px-3 py-2  hover:bg-slate-500 transition rounded z-50"
      >
        <FontAwesomeIcon size="2x" icon={faGear} />
        <span className="">Settings</span>
      </button>
      <button
        className="w-full flex items-center gap-4 px-3 py-2  hover:bg-slate-500 transition rounded z-50"
        onClick={logOutHandler}
      >
        <FontAwesomeIcon size="2x" icon={faRightFromBracket} />
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default MenuList;
