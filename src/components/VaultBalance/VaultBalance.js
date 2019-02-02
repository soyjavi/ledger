import { shape, string } from 'prop-types';
import React from 'react';

import { exchange } from '../../common';
import { Consumer } from '../../context';
import BalanceCard from '../BalanceCard';
import styles from './VaultBalance.style';

const VaultBalance = ({ dataSource = {}, baseCurrency }) => {
  const {
    chart, color, currency, currentBalance, progression, title,
  } = dataSource;
  const currentCurrency = baseCurrency || currency;
  const exchangeProps = [currency, baseCurrency];

  return (
    <Consumer>
      { ({ l10n, store: { rates } }) => (
        <BalanceCard
          chart={chart}
          color={color}
          currency={currentCurrency}
          progression={progression}
          title={`${title} ${l10n.BALANCE}`}
          value={baseCurrency ? exchange(currentBalance, ...exchangeProps, rates) : currentBalance}
          style={styles.container}
        />
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
