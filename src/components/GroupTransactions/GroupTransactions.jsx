import PropTypes from 'prop-types';
import React from 'react';

import { C } from '@common';

import { BoxDate } from '../Box';
import { TransactionItem } from '../TransactionItem';

const {
  INTERNAL_TRANSFER,
  TX: {
    TYPE: { EXPENSE },
  },
} = C;

const GroupTransactions = ({ currency, timestamp, txs = [] }) => {
  let parseTxs = [...txs];

  parseTxs = parseTxs.filter((tx, index) => {
    const { type, category } = tx;
    const valid = !(type === EXPENSE && category === INTERNAL_TRANSFER);
    console.log({ type, category, index });

    if (!valid) parseTxs[index - 1].swap = tx;

    return valid;
  });

  return (
    <>
      <BoxDate highlight timestamp={timestamp} marginHorizontal="M" marginVertical="S" />
      {parseTxs.map((tx) => (
        <TransactionItem key={tx.hash} currency={currency} {...tx} />
      ))}
    </>
  );
};

GroupTransactions.propTypes = {
  currency: PropTypes.string.isRequired,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  txs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export { GroupTransactions };
