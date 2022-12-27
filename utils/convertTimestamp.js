const convertTimestamp = (timestamp) => {
  const fullDate = new Date(timestamp);
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
  if (fullDate.setHours(0, 0, 0, 0) === todayDate.setHours(0, 0, 0, 0)) {
    return time;
  }
  return date;
};

export default convertTimestamp;
