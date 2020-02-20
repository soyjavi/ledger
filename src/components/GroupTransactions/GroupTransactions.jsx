import { arrayOf, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Col, Row, Text } from '../../reactor/components';

import { exchange, verboseDate } from '../../common';
import { useL10N, useStore } from '../../context';
import { PriceFriendly } from '../PriceFriendly';
import { TransactionItem } from '../TransactionItem';

const GroupTransactions = ({ currency, timestamp, txs = [], value }) => {
  const l10n = useL10N();
  const { baseCurrency, rates } = useStore();

  return (
    <View>
      <Row justify="space" paddingHorizontal="M" marginTop="S">
        <Col>
          <Text caption>{verboseDate(timestamp, l10n)}</Text>
        </Col>
        {value !== 0 && (
          <Col width="auto">
            <PriceFriendly
              caption
              currency={baseCurrency}
              operator
              value={exchange(value, currency, baseCurrency, rates, timestamp)}
            />
          </Col>
        )}
      </Row>
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
