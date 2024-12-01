const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

const formatElevation = (elevation: number) => {
  return `${elevation.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ft`;
};

const formatDistance = (distance: number) => {
  return `${distance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} mi`;
};

export { formatDistance, formatElevation, formatTime };
