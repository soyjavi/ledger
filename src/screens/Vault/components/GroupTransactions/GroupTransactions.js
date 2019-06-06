import {
  arrayOf, number, shape, string,
} from 'prop-types';
import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { Text } from '../../../../reactor/components';

import { exchange, verboseDate } from '../../../../common';
import { Consumer } from '../../../../context';
import { PriceFriendly, TransactionItem } from '../../../../components';
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
          <Fragment>
            <View style={[styles.row, styles.heading]}>
              <View style={styles.tag}>
                <Text subtitle level={3} lighten>{verboseDate(timestamp, l10n)}</Text>
              </View>
              { value !== 0 && (
                <View style={[styles.row, styles.tag]}>
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
            { txs.map(tx => <TransactionItem key={tx.hash} {...tx} currency={currency} />)}
          </Fragment>
        )}
      </Consumer>
    );
  }
}

export default GroupTransactions;
