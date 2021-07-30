import { verboseTime } from '@common';

export const formatCaption = (time, { place } = {}) => {
  let value = verboseTime(time);

  if (place) value += ` - ${place.split(',')[0]}`;

  return value;
};
