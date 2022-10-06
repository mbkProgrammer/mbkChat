import { IoMdCheckmark } from 'react-icons/io';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';

const YourMessage = () => (
  <div className="my-3 mx-2 px-3 rounded-xl py-1 bg-green-400 md:max-w-md max-w-xs self-end flex flex-col">
    <div>
      Message Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum,
      architecto!
    </div>
    <div className="self-end flex items-center">
      <span className="text-gray-200 text-xs">14:30</span>
      {/* <IoCheckmarkDoneSharp className="text-white mx-2" /> */}
      <IoMdCheckmark className="text-white mx-1" />
    </div>
  </div>
);

export default YourMessage;
