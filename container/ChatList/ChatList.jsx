/* eslint-disable react/no-unknown-property */
import { BiMessageAdd } from 'react-icons/bi';
import { ChatItem, Search } from '../../components';

const ChatList = () => (
  <div className="w-3/12 relative min-h-screen max-h-screen select-none">
    <header className="flex flex-row ">
      <Search />
      <button type="button" className="w-2-12 px-4 py-2 m-1 bg-blue-600 rounded-3xl">
        <BiMessageAdd className="text-white text-2xl w-fit" />
      </button>
    </header>
    <div className="overflow-auto w-full max-h-full absolute chatlists">
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
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
        background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,121,11,1) 0%, rgba(7,146,79,1) 22%, rgba(5,162,121,1) 41%, rgba(4,173,150,1) 65%, rgba(0,212,255,1) 100%);
        border-radius: 2px;
      }
    `}
    </style>
  </div>
);

export default ChatList;
