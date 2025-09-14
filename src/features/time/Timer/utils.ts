export const getTimerStr = (
  durationTime: number,
  actualTime: number,
  isOverflow: boolean,
) => {
  const hours = Math.floor(Math.abs(durationTime - actualTime) / 3600);
  const hString = hours > 0 || (isOverflow && hours > 0) ? `${hours}h ` : "";

  const minutes = Math.floor((Math.abs(durationTime - actualTime) % 3600) / 60);
  const mString =
    minutes > 0 || (isOverflow && minutes > 0) ? `${minutes}m ` : "";

  const seconds = Math.floor(Math.abs(durationTime - actualTime) % 60);
  const sString = seconds > 0 || isOverflow ? `${seconds}s` : "";

  return `${actualTime > durationTime ? "-" : ""}${hString}${mString}${sString}`;
};
