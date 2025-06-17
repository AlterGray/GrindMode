// TODO date-fns or dayjs. RENAME OR
export const isDateInLastNDays = (dateStr: string, days: number): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const threshold = new Date(today);
  threshold.setDate(today.getDate() - (days - 1));

  return date >= threshold && date <= today;
};

// week 7 days ago, function should check if it in 7 days before today - 7 days
export const isDateInPrevNDays = (
  dateStrToCheck: string,
  dateStrFrom: string,
  days: number,
): boolean => {
  const dateToCheck = new Date(dateStrToCheck);
  const dateFrom = new Date(dateStrFrom);
  dateToCheck.setHours(0, 0, 0, 0);
  dateFrom.setHours(0, 0, 0, 0);

  const threshold = new Date(dateFrom);
  threshold.setDate(dateFrom.getDate() - (days - 1));

  return dateToCheck >= threshold && dateToCheck <= dateFrom;
};

export const isTodayUTC = (dateString: string): boolean => {
  const inputDate = new Date(dateString);
  const now = new Date();

  return (
    inputDate.getUTCFullYear() === now.getUTCFullYear() &&
    inputDate.getUTCMonth() === now.getUTCMonth() &&
    inputDate.getUTCDate() === now.getUTCDate()
  );
};

export const isSameDay = (
  dateString1: string,
  dateString2: string,
): boolean => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getNextDay = (dateString: string, count: number): string => {
  const inputDate = new Date(dateString);

  inputDate.setDate(inputDate.getDate() + count);

  return inputDate.toISOString();
};

export const getDateNDaysAgo = (dateString: string, count: number): string => {
  const inputDate = new Date(dateString);

  inputDate.setDate(inputDate.getDate() - count);

  return inputDate.toISOString();
};

export const getDaysDiff = (date1: Date, date2: Date) => {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  const timeDiff = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};
