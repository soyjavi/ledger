import { L10N } from '@common';

export const verboseMonth = (timestamp = new Date()) =>
  L10N.MONTHS[new Date(timestamp).getMonth()].toUpperCase().substr(0, 3);
