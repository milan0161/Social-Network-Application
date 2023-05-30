import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import MenuList from './MenuList';
import SearchBar from './SearchBar';
import { Menu } from '../icons/Menu';

export const MainNav: React.FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const user = useAppSelector((state) => state.auth.user);

  const openMenuHandler = () => {
    setIsVisible((prev) => {
      return !prev;
    });
  };

  return (
    <nav className="grid grid-rows-1 grid-cols-6 w-full gap-3 2xl:grid-rows-1 px-4 py-2">
      <div className="col-start-1 col-span-6 row-start-1 2xl:col-start-1 2xl:col-span-2 xl:col-start-1 xl:col-span-2 lg:col-start-1 lg:col-span-2">
        <SearchBar />
      </div>
      <ul className="nav_bar">
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'nav_link' : 'nav_active')} to={'/'}>
            New Feeds
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'nav_link' : 'nav_active')} to={'discover'}>
            Discover
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'nav_link' : 'nav_active')} to={`profile/${user.id}`} end>
            {user.firstname}
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'nav_link' : 'nav_active')} to={'messages'}>
            Chats
          </NavLink>
        </li>
      </ul>
      <div
        className={
          'flex flex-row justify-center col-start-6 col-span-1 row-start-2 2xl:row-start-1 xl:row-start-1 lg:row-start-1 relative'
        }
      >
        <button onClick={openMenuHandler} className="options_btn">
          <Menu />
        </button>
        {isVisible && (
          <MenuList
            onShow={() => {
              setIsVisible((prev) => {
                return !prev;
              });
            }}
          />
        )}
      </div>
    </nav>
  );
};
