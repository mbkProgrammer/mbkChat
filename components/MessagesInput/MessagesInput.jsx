import { BsEmojiSmile } from 'react-icons/bs';
import { FiPaperclip } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';

const MessagesInput = () => (
  <div className="flex Messages__Input items-center w-full bg-gray-200  py-2 px-4 select-none">
    <button type="button" className="rounded-full mr-3 hover:bg-gray-300 p-0 py-2 text-center px-2">
      <BsEmojiSmile className="w-7 h-7 text-gray-500 " />
    </button>
    <button type="button" className="rounded-full mr-3 hover:bg-gray-300 p-0 py-2 text-center px-2">
      <FiPaperclip className="w-7 h-7 text-gray-500 " />
    </button>
    <input placeholder="Message" className="outline-none w-full rounded-xl py-2 px-4 bg-gray-50" />
    <button type="submit" className="rounded-full ml-3 hover:bg-gray-300 p-0 py-2 text-center px-2">
      <IoMdSend className="w-7 h-7 ml-1 text-blue-500" />
    </button>

    <style jsx>
      {`
        .Messages__Input {
          height: 62px;
        }
      `}
    </style>
  </div>
);

export default MessagesInput;
