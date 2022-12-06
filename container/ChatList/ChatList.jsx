/* eslint-disable react/no-unknown-property */
import { signOut } from 'firebase/auth';
import { BiLogOut, BiMessageAdd } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import {
  AiOutlineClose,
  AiOutlineLoading3Quarters,
  AiOutlineMenu,
} from 'react-icons/ai';
import { LOG_OUT_ACTION } from '../../actions/auth';
import { ChatItem, Search } from '../../components';
import { db } from '../../firebase';

const ChatList = ({ setOpenAddChat }) => {
  const [userSaerch, setUserSearch] = useState('');
  const [activeMenu, setActiveMenu] = useState(false);
  const [users, setUsers] = useState([null]);
  const dispatch = useDispatch();
  const { chats, loading } = useSelector((state) => state.chats);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '>=', userSaerch),
    );
    const querySnapshot = await getDocs(q);
    setUsers(querySnapshot);
    users.forEach((doc) => {
      console.log('users', doc.data());
    });
  };

  useEffect(() => {
    if (userSaerch !== '') {
      handleSearch();
    }
  }, [userSaerch]);

  return (
    <div
      className={`xl:w-3/12 md:w-4/12 w-72 min-h-screen ${
        !activeMenu && 'w-12'
      } overflow-hidden duration-300 max-h-screen select-none z-30 relative bg-white`}
    >
      <header className="flex flex-row relative md:max-w-full">
        <div className="md:hidden flex items-center">
          {!activeMenu ? (
            <button
              type="button"
              className="rounded-full hover:bg-gray-200 p-2"
              onClick={() => setActiveMenu(true)}
            >
              <AiOutlineMenu className="text-gray-800 text-3xl w-fit " />
            </button>
          ) : (
            <button
              type="button"
              className="rounded-full hover:bg-gray-200 p-2"
              onClick={() => setActiveMenu(false)}
            >
              <AiOutlineClose className="text-gray-800 text-3xl w-fit " />
            </button>
          )}
        </div>
        <Search onChange={(e) => setUserSearch(e.target.value)} />
        <button
          type="button"
          className="w-fit px-3 py-1 m-1 bg-red-600 rounded-full"
          onClick={() => dispatch(LOG_OUT_ACTION())}
        >
          <BiLogOut className="text-white text-2xl w-fit" />
        </button>
        <button
          type="button"
          className="w-fit px-3 py-1 m-1 bg-blue-600 rounded-full"
          onClick={() => setOpenAddChat(true)}
        >
          <BiMessageAdd className="text-white text-2xl w-fit" />
        </button>
      </header>
      {loading && (
        <AiOutlineLoading3Quarters className="animate-spin m-auto text-xl" />
      )}
      <div className="overflow-auto w-full max-h-full absolute chatlists ">
        {chats
          && chats.map(
            (chat) => chat[1].date && (
            <ChatItem
              activeMenu={activeMenu}
              data={chat[1]}
              key={chat[0]}
            />
            ),
          )}
      </div>

      <style jsx>
        {`
          .chatlists::-webkit-scrollbar {
            width: 5px;
          }

          .chatlists::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .chatlists::-webkit-scrollbar-thumb {
            background: radial-gradient(
              circle,
              rgba(2, 0, 36, 1) 0%,
              rgba(9, 121, 11, 1) 0%,
              rgba(7, 146, 79, 1) 22%,
              rgba(5, 162, 121, 1) 41%,
              rgba(4, 173, 150, 1) 65%,
              rgba(0, 212, 255, 1) 100%
            );
            border-radius: 2px;
          }
        `}
      </style>
    </div>
  );
};

export default ChatList;
