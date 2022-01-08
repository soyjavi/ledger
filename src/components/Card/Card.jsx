import {
  // helpers,
  ALIGN,
  COLOR,
  FLEX_DIRECTION,
  POINTER,
  SIZE as SPACE,
  // components
  Text,
  Touchable,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { getCurrencySymbol, exchange } from '@common';
import { useStore } from '@context';

import { Box } from '../Box';
import { PriceFriendly } from '../PriceFriendly';
import { CARD_SIZE, style } from './Card.style';

const Card = ({ balance = 0, currency, highlight, percentage = 0, title = '', onPress, ...others }) => {
  const {
    settings: { baseCurrency },
    rates,
  } = useStore();

  const hasBalance = balance !== null && parseFloat(balance.toFixed(2)) > 0;
  const textColor = highlight ? COLOR.BASE : !hasBalance ? COLOR.GRAYSCALE_L : undefined;

  return (
    <Touchable {...others} onPress={onPress}>
      <Box
        color={highlight ? COLOR.PRIMARY : hasBalance ? COLOR.INFO : COLOR.BASE}
        pointerEvents={POINTER.NONE}
        style={[style.box, !hasBalance && style.outlined]}
      >
        <View style={style.content} wide>
          {currency && (
            <>
              <Text action color={COLOR.GRAYSCALE_L} ellipsizeMode level={2} numberOfLines={1} upperCase>
                {title}
              </Text>

              <PriceFriendly color={textColor} currency={currency} level={2} value={Math.abs(balance)} />

              {currency !== baseCurrency && (
                <PriceFriendly
                  color={highlight ? COLOR.BASE : COLOR.GRAYSCALE_L}
                  currency={baseCurrency}
                  detail
                  level={2}
                  marginTop={SPACE.XXS}
                  value={exchange(Math.abs(balance), currency, baseCurrency, rates)}
                />
              )}
            </>
          )}

          <View style={style.spacer} />

          <View alignItems={ALIGN.CENTER} flexDirection={FLEX_DIRECTION.ROW} wide>
            <Box
              color={highlight ? COLOR.CONTENT : hasBalance ? COLOR.GRAYSCALE_XL : COLOR.BASE}
              style={!hasBalance && !highlight && style.outlined}
            >
              <Text color={highlight ? COLOR.BASE : COLOR.GRAYSCALE_L} style={style.currency}>
                {getCurrencySymbol(currency)}
              </Text>
            </Box>
            <View style={style.spacer} />
            {!!percentage && (
              <PriceFriendly color={textColor} currency="%" operator detail level={2} fixed={2} value={percentage} />
            )}
          </View>
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
