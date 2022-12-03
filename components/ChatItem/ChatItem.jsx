/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_MESSAGE_ACTION } from '../../actions';

const ChatItem = ({ data }) => {
  const { activeUser } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const fullDate = new Date(data.date.seconds * 1000);
  const todayDate = new Date();
  const date = fullDate.toLocaleDateString('zh-Hans-CN', {
    month: '2-digit',
    year: '2-digit',
    day: '2-digit',
  });
  const time = fullDate.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleSelect = async () => {
    dispatch(CHANGE_MESSAGE_ACTION({ userUID: data.userInfo.uid }));
  };

  return (
    <div
      className={`py-3 px-4 w-full h-fit flex items-center duration-100 hover:bg-blue-100 ${data.userInfo.uid === activeUser && 'bg-green-200'} select-none`}
      onClick={handleSelect}
    >
      <div className="p-0 m-0 relative">
        <span className="absolute w-3 h-3 bg-green-600 rounded-full z-10 right-0 bottom-1.5" />
        <Image
          src={
            data.userInfo.photoURL
              ? data.userInfo.photoURL
              : '/assets/img/user.png'
          }
          className="rounded-full"
          width="48"
          height="48"
          alt="user picture"
        />
      </div>
      <div className="flex justify-between w-full select-none">
        <div className="ml-4 items-center">
          <h4 className="font-bold cursor-pointer">
            {data.userInfo.displayName}
          </h4>
          <p className="font-normal text-sm text-gray-500 cursor-pointer">
            {data.lastMessage && data.lastMessage.text}
          </p>
        </div>
        <div className="flex flex-col justify-between items-end">
          <p className="text-xs text-gray-400 font-normal cursor-pointer">
            {data.date.seconds
            && fullDate.setHours(0, 0, 0, 0) === todayDate.setHours(0, 0, 0, 0)
              ? time
              : date}
          </p>
          <p className="bg-green-500 rounded-full w-5 h-5 cursor-pointer text-xs text-white flex justify-center items-center">
            1
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChatItem;
