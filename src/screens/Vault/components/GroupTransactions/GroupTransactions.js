import {
  arrayOf, number, shape, string,
} from 'prop-types';
import React, { Component, Fragment } from 'react';
import { View } from 'react-native';

import ASSETS from '../../../../assets';
import { C, exchange, verboseDate } from '../../../../common';
import { Consumer } from '../../../../context';
import { Heading, TransactionItem } from '../../../../components';
import { Icon, Price } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';
import styles from './GroupTransactions.style';

const { FIXED, SYMBOL } = C;
const { COLOR } = THEME;

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
            <Heading breakline subtitle={verboseDate(timestamp, l10n)}>
              { value !== 0 && (
                <View style={styles.headingValues}>
                  <Icon value={value > 0 ? ASSETS.income : ASSETS.expense} style={styles.icon} />
                  <Price
                    color={value > 0 ? COLOR.INCOMES : COLOR.EXPENSES}
                    subtitle
                    level={3}
                    fixed={FIXED[baseCurrency]}
                    symbol={SYMBOL[baseCurrency]}
                    value={baseCurrency !== currency
                      ? exchange(Math.abs(value), currency, baseCurrency, rates)
                      : Math.abs(value)}
                  />
                </View>
              )}
            </Heading>
            { txs.map(tx => <TransactionItem key={tx.hash} {...tx} currency={currency} />)}
          </Fragment>
        )}
      </Consumer>
    );
  }
}

export default GroupTransactions;
