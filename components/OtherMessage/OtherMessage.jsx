const OtherMessage = ({ data }) => {
  const fullDate = new Date(data.date.seconds * 1000);
  const todayDate = new Date();
  const date = fullDate.toLocaleDateString('zh-Hans-CN', {
    month: '2-digit',
    year: '2-digit',
    day: '2-digit',
  });
  const time = fullDate.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div className="my-3 mx-2 px-3 rounded-xl py-1 bg-white md:max-w-md max-w-xs self-start flex flex-col">
      {
        data.img && <img src={data.img} alt={data.text} className="rounded-md mt-1" />
      }
      <div>
        {data.text}
      </div>
      <div className="self-end flex items-center">
        <span className="text-gray-900 text-xs">
          {data.date.seconds
            && fullDate.setHours(0, 0, 0, 0) === todayDate.setHours(0, 0, 0, 0)
            ? time
            : date}

        </span>
      </div>
    </div>
  );
};
export default OtherMessage;
