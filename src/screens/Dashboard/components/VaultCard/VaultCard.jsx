import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';

import { Card } from '@components';

const { COLOR } = THEME;

export const VaultCard = ({ currency, currentBalance, currentMonth: { progression }, title = '', ...others }) => {
  const percentage = progression
    ? currentBalance - progression > 0
      ? (progression * 100) / (currentBalance - progression)
      : progression
    : undefined;

  return (
    <Card
      {...others}
      balance={currentBalance}
      bold={percentage > 0}
      color={percentage > 0 ? COLOR.BRAND : COLOR.LIGHTEN}
      currency={currency}
      highlight={percentage > 0}
      operator={percentage < 0}
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
