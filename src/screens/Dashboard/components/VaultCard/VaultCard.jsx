import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';

import { C, colorOpacity } from '@common';
import { Card } from '@components';

const { OPACITY } = THEME;
const { CURRENCY_COLOR } = C;

const VaultCard = ({ currency, currentBalance, currentMonth: { progression }, title = '', ...others }) => {
  const percentage = progression
    ? currentBalance - progression > 0
      ? (progression * 100) / (currentBalance - progression)
      : progression
    : undefined;

  return (
    <Card
      {...others}
      balance={currentBalance}
      color={colorOpacity(CURRENCY_COLOR[currency], OPACITY.S)}
      currency={currency}
      operator
      percentage={percentage}
      title={title}
    />
  );
};

VaultCard.propTypes = {
  currency: PropTypes.string.isRequired,
  currentBalance: PropTypes.number.isRequired,
  currentMonth: PropTypes.shape({
    progression: PropTypes.number,
  }),
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export { VaultCard };
