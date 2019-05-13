import { verboseTime } from '../../../common';

export default (time, { place } = {}) => {
  let value = verboseTime(time);

  if (place) value += ` - ${place.split(',')[0]}`;

  return value;
};
