import { C } from '@common';

const { CURRENCY } = C;

export const parseVault = ({ hash, balance = 0, currency = CURRENCY, timestamp, title } = {}) => ({
  hash,
  balance: parseFloat(balance, 10),
  currency,
  timestamp,
  title,
});
