const extractDuration = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}h ${minutes}m`;
};

export { extractDuration };
