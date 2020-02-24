import { arrayOf, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { Text } from '../../reactor/components';

import { verboseDate } from '../../common';
import { useL10N } from '../../context';
import { TransactionItem } from '../TransactionItem';

const GroupTransactions = ({ currency, timestamp, txs = [] }) => {
  const l10n = useL10N();

  return (
    <>
      <Text caption paddingHorizontal="M" marginTop="S">
        {verboseDate(timestamp, l10n)}
      </Text>
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
