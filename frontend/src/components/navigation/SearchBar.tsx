import React, { useEffect, useState } from 'react';
import { useSearchUsersQuery } from '../../features/user/api/userApiSlice';
import SearchList from '../user/SearchList';

const SearchBar = () => {
  const [searchData, setSearchData] = useState<string>('');
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const searchDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };
  const { data, isSuccess } = useSearchUsersQuery(searchData);

  useEffect(() => {
    if (isSuccess) {
      setIsSearch(true);
    }
  }, [isSearch, isSuccess, data]);
  return (
    <>
      <form action="" className=" w-full">
        <div className="relative w-full">
          <div className="absolute inste-y-0 pointer-events-none left-2 top-2 flex items-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            value={searchData}
            onChange={searchDataHandler}
            className="block w-full p-2 pl-10 bg-white text-sm text-gray-900"
            placeholder="Search for your soul mate here"
            type="search"
            id="default_search"
          />
          <button
            className="absolute top-[2px] border border-slate-300 right-2 btn text-slate-900 bg-transparent px-2 py-1 hover:bg-slate-300 hover:text-white hover:scale-100"
            type="button"
          >
            Search
          </button>
        </div>
      </form>
      {isSearch && <SearchList setSearchData={setSearchData} users={data!.users} />}
    </>
  );
};

export default SearchBar;
