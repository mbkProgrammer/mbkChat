import { useSelector } from 'react-redux';
import convertTimestamp from '../../utils/convertTimestamp';

const OtherMessage = ({ data }) => (
  <div className="my-1 md:my-3 mx-2 px-3 rounded-xl rounded-bl-sm py-1 bg-white md:max-w-md max-w-xs self-start flex flex-col">
    {
        data.img && <img src={data.img} alt={data.text} className="rounded-md mt-1" />
      }
    <div>
      {data.text}
    </div>
    <div className="self-end flex items-center">
      <span className="text-gray-900 text-xs">
        {convertTimestamp(data.date.seconds * 1000)}

      </span>
    </div>
  </div>
);
export default OtherMessage;
