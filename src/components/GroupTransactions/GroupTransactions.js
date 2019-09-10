import {
  arrayOf, number, shape, string,
} from 'prop-types';
import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { Text } from '../../reactor/components';

import { exchange, verboseDate } from '../../common';
import { Consumer } from '../../context';
import Box from '../Box';
import PriceFriendly from '../PriceFriendly';
import TransactionItem from '../TransactionItem';
import styles from './GroupTransactions.style';

class GroupTransactions extends Component {
  static propTypes = {
    currency: string.isRequired,
    timestamp: string.isRequired,
    txs: arrayOf(shape()).isRequired,
    value: number,
  };

  static defaultProps = {
    value: 0,
  };

  shouldComponentUpdate(nextProps) {
    const { props: { timestamp, value } } = this;
    return timestamp !== nextProps.timestamp && value !== nextProps.value;
  }

  render() {
    const {
      props: {
        currency, timestamp, txs = [], value,
      },
    } = this;

    return (
      <Consumer>
        { ({ store: { baseCurrency, rates }, l10n }) => (
          <View style={styles.container}>
            <View style={[styles.row, styles.heading]}>
              <Box style={styles.tag}>
                <Text subtitle level={3}>{verboseDate(timestamp, l10n)}</Text>
              </Box>
              { value !== 0 && (
                <View style={styles.tag}>
                  <PriceFriendly
                    currency={baseCurrency}
                    icon
                    subtitle
                    level={3}
                    value={exchange(value, currency, baseCurrency, rates, timestamp)}
                  />
                </View>
              )}
            </View>
            { txs.map((tx) => <TransactionItem key={tx.hash} currency={currency} {...tx} />)}
          </View>
        )}
      </Consumer>
    );
  }
}

export default GroupTransactions;
