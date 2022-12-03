import { useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { FiPaperclip } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { SEND_MESSAGE_ACTION } from '../../actions';

const MessagesInput = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const { chatId, activeUser } = useSelector((state) => state.messages);

  const handleSend = async (e) => {
    e.preventDefault();
    dispatch(SEND_MESSAGE_ACTION({
      text, img, chatId, activeUser,
    }));
    setImg(null);
    setText('');
  };

  return (
    <form className="flex Messages__Input items-center w-full bg-gray-200  py-2 px-4 select-none">
      <button type="button" className="rounded-full mr-3 hover:bg-gray-300 p-0 py-2 text-center px-2">
        <BsEmojiSmile className="w-7 h-7 text-gray-500 " />
      </button>
      <label htmlFor="send-img" className="rounded-full mr-3 hover:bg-gray-300 p-0 py-2 text-center px-2">
        <FiPaperclip className="w-7 h-7 text-gray-500 " />
        <input type="file" onChange={(e) => setImg(e.target.files[0])} id="send-img" className="sr-only" />
      </label>
      <input value={text} placeholder="Message" required onChange={(e) => setText(e.target.value)} className="outline-none w-full rounded-xl py-2 px-4 bg-gray-50" />
      <button type="submit" onClick={handleSend} className="rounded-full ml-3 hover:bg-gray-300 p-0 py-2 text-center px-2">
        <IoMdSend className="w-7 h-7 ml-1 text-blue-500" />
      </button>

      <style jsx>
        {`
          .Messages__Input {
            height: 62px;
          }
        `}
      </style>
    </form>
  );
};
export default MessagesInput;
