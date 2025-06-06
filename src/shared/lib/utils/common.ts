export const extractDuration = (minutes: number) => {
  if (minutes === 0) return "NO LIMIT";
  return `${Math.floor(minutes / 60)}h ${minutes - Math.floor(minutes / 60) * 60}m`;
};

export const formatTimeLabel = (time: number): string => {
  const date = new Date(time);
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  const hour12 = hour % 12 || 12;
  const period = hour >= 12 ? "PM" : "AM";
  return `${hour12}:${minute} ${period}`;
};

export const formatDurationLabel = (duration: number): string =>
  duration > 0 ? `${Math.floor(duration / 60)}h ${duration % 60}m` : "No limit";

export const capitalize = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export const isToday = (dateString: string): boolean => {
  const inputDate = new Date(dateString);
  const today = new Date();

  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  );
};
