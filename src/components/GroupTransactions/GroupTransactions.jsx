import PropTypes from 'prop-types';
import React from 'react';

import { useL10N } from '@context';

import { BoxDate } from '../Box';
import { TransactionItem } from '../TransactionItem';

const GroupTransactions = ({ currency, onPress, timestamp, txs = [] }) => {
  const l10n = useL10N();

  return (
    <>
      <BoxDate l10n={l10n} timestamp={timestamp} marginHorizontal="M" marginVertical="S" />
      {txs.map((tx) => (
        <TransactionItem key={tx.hash} currency={currency} onPress={onPress} {...tx} />
      ))}
    </>
  );
};

GroupTransactions.propTypes = {
  currency: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  txs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export { GroupTransactions };
