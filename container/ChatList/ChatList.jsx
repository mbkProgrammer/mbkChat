/* eslint-disable react/no-unknown-property */
import { signOut } from 'firebase/auth';
import { BiLogOut, BiMessageAdd } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import { LOG_OUT_ACTION } from '../../actions/auth';
import { ChatItem, Search } from '../../components';
import { db } from '../../firebase';

const ChatList = ({ setOpenAddChat }) => {
  const [userSaerch, setUserSearch] = useState('');
  const [users, setUsers] = useState([null]);
  const dispatch = useDispatch();

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
    <div className="w-4/12 relative min-h-screen max-h-screen select-none">
      <header className="flex flex-row ">
        <Search onChange={(e) => setUserSearch(e.target.value)} />
        <button
          type="button"
          className="w-fit px-4 py-1 m-1 bg-red-600 rounded-3xl"
          onClick={() => dispatch(LOG_OUT_ACTION())}
        >
          <BiLogOut className="text-white text-2xl w-fit" />
        </button>
        <button
          type="button"
          className="w-fit px-4 py-1 m-1 bg-blue-600 rounded-3xl"
          onClick={() => setOpenAddChat(true)}
        >
          <BiMessageAdd className="text-white text-2xl w-fit" />
        </button>
      </header>
      <div className="overflow-auto w-full max-h-full absolute chatlists ">
        <ChatItem />
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
