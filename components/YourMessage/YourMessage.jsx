import { IoMdCheckmark } from 'react-icons/io';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import convertTimestamp from '../../utils/convertTimestamp';

const YourMessage = ({ data }) => (
  <div className="my-1 md:my-3 mx-2 px-3 rounded-xl rounded-br-sm py-1 bg-green-400 md:max-w-md max-w-xs self-end flex flex-col">
    {
        data.img && <img src={data.img} alt={data.text} className="rounded-md mt-1" />
      }
    <div>
      {data.text}
    </div>
    <div className="self-end flex items-center">
      <span className="text-gray-200 text-xs">
        {convertTimestamp(data.date.seconds)}
      </span>
    </div>
  </div>
);
export default YourMessage;
