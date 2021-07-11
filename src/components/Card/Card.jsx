import {
  // helpers,
  ALIGN,
  COLOR,
  FLEX_DIRECTION,
  SIZE as SPACE,
  // components
  Text,
  Touchable,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { exchange } from '@common';
import { useStore } from '@context';

import { Box } from '../Box';
import { CurrencyLogo } from '../CurrencyLogo';
import { PriceFriendly } from '../PriceFriendly';
import { CARD_SIZE, style } from './Card.style';

const Card = ({ balance = 0, currency, highlight, onPress, title = '', ...others }) => {
  const {
    settings: { baseCurrency },
    rates,
  } = useStore();

  const hasBalance = parseFloat(balance.toFixed(2)) > 0;
  const textColor = highlight ? COLOR.BASE : !hasBalance ? COLOR.GRAYSCALE_L : undefined;

  return (
    <Touchable {...others} onPress={onPress}>
      <Box color={highlight ? COLOR.PRIMARY : COLOR.INFO} style={style.box}>
        <View style={style.content}>
          <View alignItems={ALIGN.CENTER} flexDirection={FLEX_DIRECTION.ROW}>
            <CurrencyLogo color={!hasBalance ? COLOR.GRAYSCALE_L : undefined} currency={currency} />
            <Text color={textColor} detail level={2} marginLeft={SPACE.S} numberOfLines={1}>
              {title.toUpperCase()}
            </Text>
          </View>

          <View style={style.breakline} />

          {currency && (
            <>
              <PriceFriendly color={textColor} currency={currency} level={2} value={balance} />

              {currency !== baseCurrency ? (
                <PriceFriendly
                  color={textColor}
                  currency={baseCurrency}
                  detail
                  level={2}
                  marginTop={SPACE.XXS}
                  value={exchange(Math.abs(balance), currency, baseCurrency, rates)}
                />
              ) : (
                <Text color={textColor} detail level={2} marginTop={SPACE.XXS}>
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
  percentage: PropTypes.number,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

export { Card, CARD_SIZE };
