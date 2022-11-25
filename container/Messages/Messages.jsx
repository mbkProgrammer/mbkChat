import { useEffect, useRef } from 'react';
import {
  TopBar, MessagesInput, YourMessage, OtherMessage,
} from '../../components';

const Messages = () => {
  const message = useRef(null);
  useEffect(() => {
    message.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);
  return (
    <div className="w-8/12 relative max-h-screen flex flex-col">
      <TopBar />
      <div className="message w-full overflow-auto">
        <div ref={message} className="chat__messages md:mx-20 flex flex-col-reverse justify-items-end overflow-auto ">
          <YourMessage />
          <OtherMessage />
          <YourMessage />
          <OtherMessage />
          <YourMessage />
          <OtherMessage />
          <YourMessage />
          <OtherMessage />
          <YourMessage />
          <OtherMessage />
          <div />
        </div>
      </div>
      <MessagesInput />

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
