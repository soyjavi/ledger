import { format } from 'reactor/components/Price/modules';

const MASK_SYMBOL = '*';

export const maskValue = ({ value }) =>
  format({
    value: value >= 1000 ? 9999 : 9.99,
  }).replace(/[0-9]/gi, MASK_SYMBOL);
