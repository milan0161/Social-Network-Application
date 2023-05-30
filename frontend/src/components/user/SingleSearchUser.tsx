import React, { Dispatch, SetStateAction } from 'react';
import { User } from '../../features/user/types';
import { REACT_APP_BASE_URL } from '../../api/axios/axios';
import { ProfilePic } from '../icons/ProfilePic';
import { useNavigate } from 'react-router-dom';

interface SingleSearchUserProps {
  user: User;
  setSearchData: Dispatch<SetStateAction<string>>;
}

const SingleSearchUser = ({ user, setSearchData }: SingleSearchUserProps) => {
  const navigate = useNavigate();
  let mainImage = `${REACT_APP_BASE_URL}/${user.mainImage}`;
  //   mainImage = mainImage.replaceAll(' ', '%20');
  let imageContent;
  if (mainImage.includes('null')) {
    imageContent = (
      <div className="border border-slate-300 w-20 h-20 rounded-full bg-white mx-auto transition duration-300 hover:scale-125">
        <ProfilePic className="w-16 h-16 mx-auto mt-1" />
      </div>
    );
  } else {
    imageContent = (
      <img
        className="rounded-full w-20 h-full hover:scale-125 transition duration-300 border border-slate-500"
        src={`${mainImage}`}
        alt={user.firstname}
        loading="lazy"
      />
    );
  }

  const onProfileHandler = () => {
    navigate(`/profile/${user.id}`);

    setSearchData('');
  };

  return (
    <li className="flex flex-row items-center gap-10 border bg-slate-200 border-slate-300 p-4">
      <div className="">{imageContent}</div>
      <div className="text-white">
        <button
          onClick={onProfileHandler}
          className="text-lg text-white"
        >{`${user.firstname} ${user.lastname}`}</button>
      </div>
    </li>
  );
};

export default SingleSearchUser;
