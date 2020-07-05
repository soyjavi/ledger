import { arrayOf, number, oneOfType, shape, string } from 'prop-types';

import React from 'react';

import { useL10N } from '@context';

import { BoxDate } from '../Box';
import { TransactionItem } from '../TransactionItem';

const GroupTransactions = ({ currency, timestamp, txs = [] }) => {
  const l10n = useL10N();

  return (
    <>
      <BoxDate l10n={l10n} timestamp={timestamp} marginHorizontal="M" marginVertical="S" />
      {txs.map((tx) => (
        <TransactionItem key={tx.hash} currency={currency} {...tx} />
      ))}
    </>
  );
};

GroupTransactions.propTypes = {
  currency: string.isRequired,
  timestamp: oneOfType([string, number]).isRequired,
  txs: arrayOf(shape()).isRequired,
  value: number,
};

GroupTransactions.defaultProps = {
  value: 0,
};

export { GroupTransactions };
