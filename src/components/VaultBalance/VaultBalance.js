import { shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import { Price, Text } from '../../reactor/components';
import BulletPrice from '../BulletPrice';
import Chart from '../Chart';
import styles from './VaultBalance.style';

const { FIXED, SYMBOL } = C;

const VaultBalance = ({ dataSource = {}, baseCurrency }) => {
  const {
    chart, color, currency, currentBalance, lastWeek: { expenses, incomes } = {}, title,
  } = dataSource;
  const currentCurrency = baseCurrency || currency;
  const exchangeProps = [currency, baseCurrency];

  return (
    <Consumer>
      { ({ l10n, store: { rates } }) => (
        <View style={[styles.row, styles.container]}>
          <View style={styles.info}>
            <Text lighten subtitle>{title}</Text>
            <Price
              fixed={FIXED[currentCurrency]}
              headline
              level={4}
              symbol={SYMBOL[currentCurrency]}
              value={baseCurrency ? exchange(currentBalance, ...exchangeProps, rates) : currentBalance}
            />
            <Text subtitle level={3} lighten style={styles.cashflowTitle}>{l10n.THIS_WEEK}</Text>
            <View style={styles.row}>
              <BulletPrice
                currency={currentCurrency}
                incomes
                value={baseCurrency ? exchange(incomes, ...exchangeProps, rates) : incomes}
                style={styles.bulletPrice}
              />
              <BulletPrice
                currency={currentCurrency}
                value={baseCurrency ? exchange(expenses, ...exchangeProps, rates) : expenses}
                style={styles.bulletPrice}
              />
            </View>
          </View>
          <Chart inheritValue={0} color={color} title={l10n.LAST_WEEKS} values={chart} />
        </View>
      )}
    </Consumer>
  );
};

VaultBalance.propTypes = {
  baseCurrency: string,
  dataSource: shape({}),
};

VaultBalance.defaultProps = {
  baseCurrency: undefined,
  dataSource: undefined,
};

export default VaultBalance;
