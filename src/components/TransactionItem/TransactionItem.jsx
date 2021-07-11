import {
  // helpers
  COLOR,
  // components
  Icon,
  Text,
  Touchable,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { C, exchange, getIcon } from '@common';
import { useStore } from '@context';

import { Box } from '../Box';
import { PriceFriendly } from '../PriceFriendly';
import { formatCaption } from './modules';
import { style } from './TransactionItem.style';

const {
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;

const TransactionItem = (props) => {
  const {
    settings: { baseCurrency },
    rates,
  } = useStore();
  const { category = 99, currency, location, timestamp, title, type = EXPENSE, value, onPress } = props;
  const operator = type === EXPENSE ? -1 : 1;

  return (
    <Touchable style={[style.offset, style.touchable]} onPress={onPress ? () => onPress(props) : undefined}>
      <View style={style.row}>
        <Box rounded style={style.icon}>
          <Icon name={getIcon({ category, type, title })} />
        </Box>

        <View style={style.content}>
          <View style={style.row}>
            <Text numberOfLines={1} style={style.text}>
              {title}
            </Text>
            <PriceFriendly
              color={type === INCOME ? COLOR.BRAND : undefined}
              currency={currency}
              highlight={type === INCOME}
              operator={type === EXPENSE}
              value={value * operator}
            />
          </View>

          <View style={style.row}>
            <Text color={COLOR.GRAYSCALE_L} detail level={2} style={style.text}>
              {formatCaption(new Date(timestamp), location)}
            </Text>
            {baseCurrency !== currency && (
              <PriceFriendly
                color={COLOR.GRAYSCALE_L}
                currency={baseCurrency}
                detail
                level={2}
                operator={type === EXPENSE}
                value={exchange(value, currency, baseCurrency, rates, timestamp) * operator}
              />
            )}
          </View>
        </View>
      </View>
    </Touchable>
  );
};

TransactionItem.propTypes = {
  category: PropTypes.number,
  currency: PropTypes.string.isRequired,
  location: PropTypes.shape({}),
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  type: PropTypes.number,
  value: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

export { TransactionItem };
