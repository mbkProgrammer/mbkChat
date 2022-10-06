import Image from 'next/image';
import { FiMoreVertical } from 'react-icons/fi';

const TopBar = () => (
  <div className="TopBar h-14 py-2 px-4 flex items-center justify-between select-none">
    <div className="flex w-5/12 items-center justify-start">
      <div className="relative">
        <span className="absolute w-3 h-3 bg-green-600 rounded-full z-10 right-0 bottom-1.5" />
        <Image src="/assets/img/user2.jpg" className="rounded-full w-full" width="40" height="40" alt="user picture" />
      </div>
      <div className="ml-2">
        <h4 className="font-semibold">David Moore</h4>
        <p className="font-light text-sm text-gray-500">last seen 5 min ago</p>
      </div>
    </div>
    <FiMoreVertical className="h-10 text-2xl text-gray-600" />

    <style jsx>
      {`
      .TopBar {
        border-left: 3px solid #aaa;
      }
      `}
    </style>
  </div>
);

export default TopBar;
