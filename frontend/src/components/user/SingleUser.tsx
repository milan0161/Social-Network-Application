import { UserInformations } from '../../features/auth/types';
import { REACT_APP_BASE_URL } from '../../api/axios/axios';
import { ProfilePic } from '../icons/ProfilePic';
import { Link } from 'react-router-dom';
import { useFollowUserMutation, useUnFollowUserMutation } from '../../features/socials/api/socialsApi';
import { useGetFollowingQuery } from '../../features/user/api/userApiSlice';
import { useAppSelector } from '../../app/hooks';

interface UserProps {
  user: {
    id: string;
    firstname: string;
    lastname: string;
    mainImage?: string;
    informations?: UserInformations;
  };
}

const SingleUser = ({ user }: UserProps) => {
  const mainImage: string = `${REACT_APP_BASE_URL}/${user.mainImage}`;
  let imageContent;

  let isAlreadyFollow: boolean = false;
  // const podaci = useAppSelector((state) => state.api.queries);
  const client = useAppSelector((state) => state.auth.user);

  const [follow, { data }] = useFollowUserMutation();

  const [unfollow, { data: msg }] = useUnFollowUserMutation();

  const { data: following, isSuccess } = useGetFollowingQuery(client.id);
  if (isSuccess) {
    following.following.map((f) => {
      if (f.id === user.id) {
        return (isAlreadyFollow = true);
      }
      return;
    });
  }

  if (mainImage.includes('null')) {
    imageContent = (
      <div className="border border-slate-300 w-20 h-20 rounded-full bg-white mx-auto transition duration-300 hover:scale-125">
        <ProfilePic className="w-16 h-16 mx-auto mt-1" />
      </div>
    );
  } else {
    imageContent = (
      <img
        className="rounded-full w-20 mx-auto h-full hover:scale-125 transition duration-300 border border-slate-500"
        src={mainImage}
        alt={user.firstname}
        loading="lazy"
      />
    );
  }
  return (
    <section className="shadow-md w-3/5 h-24 border-2 mx-auto border-slate-400 my-2 flex flex-row bg-slate-200 rounded-lg lg:w-2/5">
      <div className=" py-2 px-1 w-28">{imageContent}</div>
      <div className="w-4/6 flex flex-col items-center justify-center gap-2">
        <Link className="text-slate-800 font-bold transition duration-200" to={`/profile/${user.id}`}>
          {user.firstname} {user.lastname}
        </Link>
        {user.informations && (
          <div>
            <p>{user.informations.age}</p>
            <p>{user.informations.city}</p>
          </div>
        )}
        <div className="">
          {!isAlreadyFollow && (
            <button
              type="button"
              className="border border-slate-400 px-2  rounded bg-light_purple text-white w-24 hover:bg-white hover:text-light_purple hover:border-light_purple hover:scale-110 transition"
              onClick={() => follow(user.id)}
            >
              Follow
            </button>
          )}
          {isAlreadyFollow && (
            <button
              type="button"
              className="border border-slate-400 px-2  rounded bg-light_purple text-white w-24 hover:bg-white hover:text-light_purple hover:border-light_purple hover:scale-110 transition"
              onClick={() => unfollow(user.id)}
            >
              Unfollow
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleUser;
