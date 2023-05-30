import React, { useState } from 'react';
import InformationForm from '../../form/InformationForm';
import ChangePasswordForm from '../../form/ChangePasswordForm';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import removeTokens from '../../../utils/removeTokens';
import { setIsAuth } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [showInfo, setIsShowInfo] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const logOutHandler = () => {
    removeTokens();
    dispatch(setIsAuth(false));
    navigate('/login');
  };

  const onShowHandler = () => {
    setIsShowInfo(true);
    setShowChangePassword(false);
  };

  return (
    <section className="w-full h-screen bg-slate-300 flex flex-row ">
      <div className="border border-white w-1/4 flex flex-col h-1/2 bg-slate-100 gap-4 items-start pl-2 pt-2">
        <button onClick={onShowHandler} className="settings_btn">
          Personal Informations
        </button>
        <button
          onClick={() => {
            setShowChangePassword(true);
            setIsShowInfo(false);
          }}
          className="settings_btn"
        >
          Change Password
        </button>
        <button onClick={logOutHandler} className="settings_btn">
          Log Out
        </button>
      </div>
      <div className="border border-white w-3/4">
        {showInfo && <InformationForm />}
        {showChangePassword && <ChangePasswordForm />}
      </div>
    </section>
  );
};

export default Settings;
