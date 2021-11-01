import { C } from './constants';

const {
  EXPENSE_AS_INVESTMENT,
  TX: {
    TYPE: { EXPENSE },
  },
} = C;

export const isNonAccountingTx = (tx = {}) => tx.type === EXPENSE && tx.category === EXPENSE_AS_INVESTMENT;
