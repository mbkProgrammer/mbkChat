import { onValue, ref } from 'firebase/database';
import { doc, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { db, rdb } from '../../firebase';
import convertTimestamp from '../../utils/convertTimestamp';

const TopBar = () => {
  const { activeUser } = useSelector((state) => state.messages);
  const [onlineStatus, setOnlineStatus] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    onSnapshot(doc(db, 'users', activeUser), (doc) => setUser(doc.data()));
    onValue(ref(rdb, `status/${activeUser}`), (snapshot) => {
      setOnlineStatus(snapshot.val());
    });
  }, []);

  return (
    <div className="TopBar h-14 py-2 px-4 flex items-center justify-between select-none">
      <div className="flex w-11/12 items-center justify-start">
        <div className="relative">
          {
            onlineStatus && onlineStatus.state === 'online'
            && <span className="absolute w-3 h-3 bg-green-600 rounded-full z-10 right-0 bottom-1.5" />
          }
          <Image
            src={
              user
            && user.photoURL
                ? user.photoURL
                : '/assets/img/user.png'
          }
            className="rounded-full w-full"
            width="40"
            height="40"
            alt="user picture"
          />
        </div>
        <div className="ml-2">
          <h4 className="font-semibold">{user && user.displayName}</h4>
          {
            onlineStatus && onlineStatus.state === 'online'
              ? <p className="font-light text-sm text-green-500">online</p>
              : (
                <p className="font-light text-sm text-gray-500">
                  last seen
                  {' '}
                  {onlineStatus && convertTimestamp(onlineStatus.last_changed)}
                </p>
              )
          }
        </div>
      </div>
      <FiMoreVertical className="h-10 text-2xl text-gray-600" />

      <style jsx>
        {`
        .TopBar {
          border-left: 3px solid #aaa;
        }
        `}
      </style>
    </div>
  );
};

export default TopBar;
