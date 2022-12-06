import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  TopBar,
  MessagesInput,
  YourMessage,
  OtherMessage,
} from '../../components';

const Messages = () => {
  const { response } = useSelector((state) => state.auth);
  const messageList = useRef(null);
  const { messages, activeUser } = useSelector((state) => state.messages);
  useEffect(() => {
    if (messageList.current) {
      messageList.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <div className="md:w-8/12 xl:w-9/12 w-full pl-12 md:pl-0 md:relative fixed h-screen flex flex-col">
      {activeUser ? (
        <>
          <TopBar />
          <div className="message w-ful h-full overflow-auto">
            <div
              reversed
              ref={messageList}
              className="chat__messages md:mx-0 lg:mx-20 flex flex-col-reverse justify-items-end overflow-auto "
            >
              {messages
                && messages.map((message) => (response.uid === message.senderId ? (
                  <YourMessage key={message.id} data={message} />
                ) : (
                  <OtherMessage key={message.id} data={message} />
                )))}
              <div />
            </div>
          </div>
          <MessagesInput />
        </>
      ) : (
        <div className="message text-white flex items-center justify-center h-screen">
          <div className="flex flex-col items-center  py-10 px-8 bg-gray-700/50 backdrop-blur-sm rounded-xl text-2xl">
            <img
              src="/assets/img/mobile-chat.png"
              className="h-fit w-48"
              alt="chat"
            />
            start messaging
          </div>
        </div>
      )}

      <style jsx>
        {`
            .message {
              background-image: url("./assets/img/messagebg2.jpg");
              background-attachment: fixed;
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
              height: 100%;
            }
          .chat__messages {
            scroll-snap-align: end;
          }
        `}
      </style>

    </div>
  );
};

export default Messages;
