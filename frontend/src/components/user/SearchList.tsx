import React, { Dispatch, SetStateAction } from 'react';
import { User } from '../../features/user/types';
import SingleSearchUser from './SingleSearchUser';

interface SearchListProps {
  users: User[];
  setSearchData: Dispatch<SetStateAction<string>>;
}

const SearchList = ({ users, setSearchData }: SearchListProps) => {
  return (
    <ul className="absolute rounded-lg w-3/4 p-1">
      {users.map((user) => {
        return <SingleSearchUser setSearchData={setSearchData} key={user.id} user={user} />;
      })}
    </ul>
  );
};

export default SearchList;
