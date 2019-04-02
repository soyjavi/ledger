const ZERO = '0';

export default (time, { place } = {}) => {
  let value = `${(ZERO + time.getHours()).slice(-2)}:${(ZERO + time.getMinutes()).slice(-2)}`;

  if (place) value += ` - ${place.split(',')[0]}`;

  return value;
};
