const extractDuration = (minutes: number) => {
  if (minutes === 0) return "NO LIMIT";
  return `${Math.floor(minutes / 60)}h ${minutes - Math.floor(minutes / 60) * 60}m`;
};

const formatTimeLabel = (time: number): string => {
  const date = new Date(time);
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  const hour12 = hour % 12 || 12;
  const period = hour >= 12 ? "PM" : "AM";
  return `${hour12}:${minute} ${period}`;
};

const formatDurationLabel = (duration: number): string =>
  duration > 0 ? `${Math.floor(duration / 60)}h ${duration % 60}m` : "No limit";

const capitalize = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export { extractDuration, formatTimeLabel, formatDurationLabel, capitalize };
