/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { onValue, ref } from 'firebase/database';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_MESSAGE_ACTION } from '../../actions';
import { db, rdb } from '../../firebase';
import convertTimestamp from '../../utils/convertTimestamp';

const ChatItem = ({ data, activeMenu }) => {
  const { activeUser } = useSelector((state) => state.messages);
  const [onlineStatus, setOnlineStatus] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    onSnapshot(doc(db, 'users', data.userUid), (doc) => setUserInfo(doc.data()));
    onValue(ref(rdb, `status/${data.userUid}`), (snapshot) => {
      setOnlineStatus(snapshot.val());
    });
  }, []);

  // const docSnap = await getDoc(data.userInfo);

  // console.log('data', docSnap.data());

  const handleSelect = async () => {
    dispatch(CHANGE_MESSAGE_ACTION({ userUID: userInfo.uid }));
  };

  return (
    <div
      className={`${!userInfo && 'animate-pulse'} px-1 py-2 md:py-3 md-px-4 w-full h-fit flex items-center duration-100 hover:bg-blue-100 ${userInfo && userInfo.uid === activeUser && 'bg-green-200'} select-none`}
      onClick={handleSelect}
    >
      <div className="p-0 m-0 relative">
        {
          onlineStatus && onlineStatus.state === 'online'
            && <span className="absolute w-3 h-3 bg-green-600 rounded-full z-10 right-0 bottom-1.5" />
        }
        <Image
          src={
            userInfo
            && userInfo.photoURL
              ? userInfo.photoURL
              : '/assets/img/user.png'
          }
          className={`rounded-full hover:rounded-2xl ${userInfo && userInfo.uid === activeUser && 'rounded-2xl'}`}
          width="48"
          height="48"
          alt="user picture"
        />
      </div>
      <div className={`${!activeMenu ? 'hidden' : 'flex'} md:flex justify-between w-full select-none`}>
        <div className="ml-4 items-center">
          <h4 className="font-bold cursor-pointer">
            {userInfo && userInfo.displayName}
          </h4>
          <p className="font-normal text-sm text-gray-500 cursor-pointer">
            {data.lastMessage && data.lastMessage.text}
          </p>
        </div>
        <div className="flex flex-col justify-between items-end">
          <p className="text-xs text-gray-400 font-normal cursor-pointer">
            {convertTimestamp(data.date.seconds)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
