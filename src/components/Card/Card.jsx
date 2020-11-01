import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { THEME } from 'reactor/common';
import { Row, Text, Touchable } from 'reactor/components';

import { C, exchange } from '@common';
import { useL10N, useStore } from '@context';

import { Box } from '../Box';
import { CurrencyLogo } from '../CurrencyLogo';
import { PriceFriendly } from '../PriceFriendly';
import styles, { CARD_WIDTH } from './Card.style';

const { CURRENCY } = C;
const { COLOR } = THEME;

const Card = ({ balance = 0, color, currency = CURRENCY, highlight, onPress, percentage, title = '', ...others }) => {
  const l10n = useL10N();
  const {
    settings: { baseCurrency },
    rates,
  } = useStore();

  const textColor = highlight ? COLOR.BACKGROUND : undefined;

  return (
    <Touchable {...others} onPress={onPress} rippleColor={color || COLOR.RIPPLE} style={styles.container}>
      <Box color={highlight ? COLOR.CTA : color} style={styles.box}>
        <View style={styles.content}>
          <Row>
            <CurrencyLogo currency={currency} size="S" />
            <Text caption color={textColor} numberOfLines={1} marginLeft="XS">
              {title.toUpperCase()}
            </Text>
          </Row>

          {currency && (
            <>
              <PriceFriendly color={textColor} currency={currency} subtitle value={balance} />
              {currency !== baseCurrency && (
                <PriceFriendly
                  caption
                  color={textColor}
                  currency={baseCurrency}
                  value={exchange(Math.abs(balance), currency, baseCurrency, rates)}
                />
              )}

              <View style={styles.expand} />

              {percentage ? (
                <PriceFriendly
                  caption
                  color={textColor}
                  currency="%"
                  highlight={others.highlight}
                  operator={others.operator}
                  value={percentage}
                />
              ) : (
                <Text caption color={COLOR.LIGHTEN}>
                  {l10n.WITHOUT_TXS}
                </Text>
              )}
            </>
          )}
        </View>
      </Box>
    </Touchable>
  );
};

Card.propTypes = {
  balance: PropTypes.number,
  color: PropTypes.string,
  currency: PropTypes.string,
  currentMonth: PropTypes.shape({}),
  highlight: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  percentage: PropTypes.number,
  title: PropTypes.string,
};

export { Card, CARD_WIDTH };
