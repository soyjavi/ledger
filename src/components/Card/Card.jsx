import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { THEME } from 'reactor/common';
import { Row, Text, Touchable } from 'reactor/components';

import { exchange } from '@common';
import { useStore } from '@context';

import { Box } from '../Box';
import { CurrencyLogo } from '../CurrencyLogo';
import { PriceFriendly } from '../PriceFriendly';
import styles, { CARD_SIZE } from './Card.style';

const { COLOR } = THEME;

const Card = ({ balance = 0, currency, highlight, onPress, title = '', ...others }) => {
  const {
    settings: { baseCurrency },
    rates,
  } = useStore();

  const textColor = highlight ? COLOR.BACKGROUND : undefined;

  return (
    <Touchable
      {...others}
      rippleColor={highlight ? COLOR.TEXT : COLOR.LIGHTEN}
      style={styles.container}
      onPress={onPress}
    >
      <Box color={highlight ? COLOR.CTA : undefined} style={styles.box}>
        <View style={styles.content}>
          <Row>
            <CurrencyLogo
              color={currency !== baseCurrency || highlight ? COLOR.LIGHTEN : undefined}
              currency={currency}
              size="M"
            />
            <Text caption color={textColor} numberOfLines={1} marginLeft="S">
              {title.toUpperCase()}
            </Text>
          </Row>

          <View style={styles.breakline} />

          {currency && (
            <>
              <PriceFriendly bold color={textColor} currency={currency} subtitle value={balance} />

              {currency !== baseCurrency ? (
                <PriceFriendly
                  caption
                  color={textColor}
                  currency={baseCurrency}
                  marginTop="XXS"
                  value={exchange(Math.abs(balance), currency, baseCurrency, rates)}
                />
              ) : (
                <Text caption color={textColor} marginTop="XXS">
                  {' '}
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
  currency: PropTypes.string,
  currentMonth: PropTypes.shape({}),
  highlight: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  percentage: PropTypes.number,
  title: PropTypes.string,
};

export { Card, CARD_SIZE };
