import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';

import { colorOpacity } from '@common';
import { Card } from '@components';

const { COLOR, OPACITY } = THEME;

const VaultCard = ({
  baseCurrency,
  currency,
  currentBalance,
  currentMonth: { progression },
  title = '',
  ...others
}) => {
  const percentage = progression
    ? currentBalance - progression > 0
      ? (progression * 100) / (currentBalance - progression)
      : progression
    : undefined;

  return (
    <Card
      {...others}
      balance={currentBalance}
      color={currency === baseCurrency ? colorOpacity(COLOR.BRAND) : undefined}
      currency={currency}
      operator
      percentage={percentage}
      title={title}
    />
  );
};

VaultCard.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currentBalance: PropTypes.number.isRequired,
  currentMonth: PropTypes.shape({
    progression: PropTypes.number,
  }),
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export { VaultCard };
