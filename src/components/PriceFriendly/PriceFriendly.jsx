import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Price, Row, Text } from 'reactor/components';

import { C, colorOpacity, currencyDecimals } from '@common';
import { useStore } from '@context';

import { maskValue } from './modules';
import styles from './PriceFriendly.style';

const { SYMBOL } = C;
const { FONT } = THEME;

const LEFT_SYMBOLS = ['$', '£'];

const PriceFriendly = ({ currency, fixed, highlight, label, operator, maskAmount, value = 0, ...others }) => {
  const { settings } = useStore();

  const maskedAmount = maskAmount || settings.maskAmount;

  let { color } = others;
  let operatorEnhanced;

  if (operator && value > 0) operatorEnhanced = '+';
  else if (operator && value < 0) operatorEnhanced = '-';

  const props = {
    ...others,
    color,
    fixed: fixed || currencyDecimals(value, currency),
    numberOfLines: 1,
    style: [FONT.BOLD, others.style],
    value: Math.abs(value),
  };

  const symbol = SYMBOL[currency] || currency;

  const { headline, subtitle, caption } = others;
  const symbolProps = {
    ...others,
    children: symbol,
    color,
    style: [
      FONT.CURRENCY,
      headline
        ? styles.symbolHeadline
        : subtitle
        ? styles.symbolSubtitle
        : caption
        ? styles.symbolCaption
        : styles.symbol,
      (headline || subtitle) && styles.symbol,
      caption && styles.symbolCaption,
      !headline && !subtitle && !caption && styles.symbolBody,
    ],
  };

  return (
    <Row
      style={highlight && !maskAmount ? [styles.highlight, { backgroundColor: colorOpacity(color) }] : undefined}
      width="auto"
    >
      {label && (
        <Text {...others} bold={false} color={color}>
          {label}
        </Text>
      )}
      {maskedAmount ? (
        <Text {...others} color={color}>
          {maskValue(props)}
        </Text>
      ) : (
        <>
          <Text {...others} color={color}>
            {operatorEnhanced}
          </Text>
          {LEFT_SYMBOLS.includes(symbol) && <Text {...symbolProps} />}
          <Price {...props} />
          {!LEFT_SYMBOLS.includes(symbol) && <Text {...symbolProps} />}
        </>
      )}
    </Row>
  );
};

PriceFriendly.propTypes = {
  currency: PropTypes.string,
  fixed: PropTypes.number,
  highlight: PropTypes.bool,
  label: PropTypes.string,
  maskAmount: PropTypes.bool,
  operator: PropTypes.bool,
  value: PropTypes.number,
};

export { PriceFriendly };
