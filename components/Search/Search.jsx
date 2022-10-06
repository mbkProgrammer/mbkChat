/* eslint-disable react/no-unknown-property */
import { AiOutlineSearch } from 'react-icons/ai';

const Search = () => {
  const a = 0;
  return (
    <div className="flex flex-row items-center justify-between bg-gray-200 h-12 w-10/12 px-4 py-2 rounded-3xl m-1">
      <AiOutlineSearch className="w-1/12 text-2xl text-gray-400" />
      <input type="search" placeholder="Search" className="search__input h-fit border-none outline-none bg-transparent w-10/12" />

      <style jsx>
        {`
          .search__input::-webkit-search-cancel-button {
            margin-right: 10px;
            padding-top: 0;
            font-size: 16px;
            color: black;
            outline: 0;
          }
        `}
      </style>
    </div>
  );
};

export default Search;
