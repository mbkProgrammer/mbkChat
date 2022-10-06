import Image from 'next/image';

const ChatItem = () => (
  <div className=" py-3 px-4 w-full h-fit flex items-center hover:bg-gray-100 active:bg-blue-100 select-none">
    <div className="p-0 m-0 relative">
      <span className="absolute w-3 h-3 bg-green-600 rounded-full z-10 right-0 bottom-1.5" />
      <Image src="/assets/img/user2.jpg" className="rounded-full" width="48" height="48" alt="user picture" />
    </div>
    <div className="flex justify-between w-full select-none">
      <div className="ml-4 items-center">
        <h4 className="font-bold cursor-pointer">Jessica Drew</h4>
        <p className="font-normal text-sm text-gray-500 cursor-pointer">see you later</p>
      </div>
      <div className="flex flex-col justify-between items-end">
        <p className="text-xs text-gray-400 font-normal cursor-pointer">19:45</p>
        <p className="bg-green-500 rounded-full w-5 h-5 cursor-pointer text-xs text-white flex justify-center items-center">1</p>
      </div>
    </div>
  </div>
);

export default ChatItem;
