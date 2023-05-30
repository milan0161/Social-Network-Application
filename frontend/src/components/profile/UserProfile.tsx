import classes from './UserProfile.module.css';

import { REACT_APP_BASE_URL } from '../../api/axios/axios';
import { ProfilePic } from '../icons/ProfilePic';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { addNewChat, setParcipient } from '../../features/messages/messagesSlice';

type ProfileProps = {
  user: {
    id: string;
    firstname: string;
    lastname: string;
    mainImage?: string;
  };
};

const UserProfile = ({ user }: ProfileProps) => {
  const mainImg: string = `${REACT_APP_BASE_URL}/${user.mainImage}`;

  const loggedUser = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let imageContent;
  if (mainImg.includes('null')) {
    imageContent = (
      <div className="border border-slate-300 w-28 h-28 rounded-full bg-white mx-auto hover:scale-110 transition duration-300">
        <ProfilePic className="w-24 h-24 mx-auto mt-1" />
      </div>
    );
  } else {
    imageContent = (
      <img
        className="border rounded-full w-28 mx-auto h-28 hover:scale-125 transition duration-300 border-slate-500"
        src={mainImg}
        alt={user.firstname}
        loading="lazy"
      />
    );
  }
  const chatWithUserHandler = () => {
    dispatch(
      addNewChat({
        users: [{ id: user.id, firstname: user.firstname, lastname: user.lastname, mainImage: user.mainImage! }],
      }),
    );
    dispatch(setParcipient({ parcipient: user }));
    navigate('/messages');
  };
  return (
    <div className="mb-10">
      <div className={classes['top_profile']}>
        <div className={classes['picture_info_div']}>
          <div className="w-36">{imageContent}</div>
          <div className={classes['info_div']}>
            <p className="text-lg cursor-pointer">{user.firstname}</p>
            <p className="text-lg cursor-pointer">{user.lastname}</p>
          </div>
          {loggedUser.id !== user.id && (
            <button
              onClick={chatWithUserHandler}
              className="border border-slate-300 w-10 h-8 rounded hover:scale-105 transition duration-300"
            >
              <FontAwesomeIcon className="h-6 my-1 text-light_purple" icon={faEnvelope} />
            </button>
          )}
        </div>
        <nav>
          <ul>
            <li>
              <NavLink className={({ isActive }) => (isActive ? 'profile_nav_active' : 'profile_nav')} to={``} end>
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? 'profile_nav_active' : 'profile_nav')}
                to={'informations'}
              >
                Informations
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? 'profile_nav_active' : 'profile_nav')} to={'followers'}>
                Followers
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? 'profile_nav_active' : 'profile_nav')} to={'following'}>
                Following
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? 'profile_nav_active' : 'profile_nav')} to={'photos'}>
                Photos
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UserProfile;
