import PropTypes from 'prop-types';

import React from 'react';

import { Card } from '@components';

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
      bold
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
