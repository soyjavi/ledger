import { arrayOf, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Text } from '../../reactor/components';

import { exchange, verboseDate } from '../../common';
import { useL10N, useStore } from '../../context';
import { PriceFriendly } from '../PriceFriendly';
import { TransactionItem } from '../TransactionItem';
import styles from './GroupTransactions.style';

const GroupTransactions = ({ currency, timestamp, txs = [], value }) => {
  const l10n = useL10N();
  const { baseCurrency, rates } = useStore();

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text lighten caption>
          {verboseDate(timestamp, l10n)}
        </Text>
        {value !== 0 && (
          <PriceFriendly
            caption
            currency={baseCurrency}
            operator
            value={exchange(value, currency, baseCurrency, rates, timestamp)}
          />
        )}
      </View>
      {txs.map((tx) => (
        <TransactionItem key={tx.hash} currency={currency} {...tx} />
      ))}
    </View>
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
