import { C } from '@common';

const { CURRENCY } = C;

export const parseVault = ({ hash, balance = 0, currency = CURRENCY, title } = {}) => ({
  hash,
  balance: parseFloat(balance, 10),
  currency,
  title,
});
