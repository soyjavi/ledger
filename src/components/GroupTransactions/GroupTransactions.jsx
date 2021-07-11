import PropTypes from 'prop-types';
import React from 'react';

import { BoxDate } from '../Box';
import { TransactionItem } from '../TransactionItem';

const GroupTransactions = ({ currency, onPress, timestamp, txs = [] }) => (
  <>
    <BoxDate highlight timestamp={timestamp} marginHorizontal="M" marginVertical="S" />
    {txs.map((tx) => (
      <TransactionItem key={tx.hash} currency={currency} onPress={onPress} {...tx} />
    ))}
  </>
);

GroupTransactions.propTypes = {
  currency: PropTypes.string.isRequired,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  txs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onPress: PropTypes.func,
};

export { GroupTransactions };
