import {
  // helpers
  COLOR,
  POINTER,
  Theme,
  styles,
  // components
  Icon,
  Text,
  Touchable,
  View,
} from '@lookiero/aurora';
import { useEvent } from '@lookiero/event';
import PropTypes from 'prop-types';
import React from 'react';

import { C, colorOpacity, EVENTS, exchange, getIcon } from '@common';
import { useStore } from '@context';

import { Box } from '../Box';
import { PriceFriendly } from '../PriceFriendly';
import { formatCaption } from './helpers';
import { style } from './TransactionItem.style';

const {
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;

const TransactionItem = (props) => {
  const { publish } = useEvent();
  const {
    settings: { baseCurrency },
    rates,
  } = useStore();

  const { category = 99, currency, timestamp, title, type = EXPENSE, value = 0 } = props;
  const operator = type === EXPENSE ? -1 : 1;

  const handlePress = () => {
    publish({ event: EVENTS.SHOW_TRANSACTION }, props);
  };

  const is = {
    income: type === INCOME,
    expense: type === EXPENSE,
  };

  return (
    <Touchable style={[style.offset, style.touchable]} onPress={handlePress}>
      <View pointerEvents={POINTER.NONE} style={style.row}>
        <Box style={styles(style.icon, is.income && { backgroundColor: colorOpacity(Theme.get('colorPrimary'), 0.2) })}>
          <Icon color={is.income ? COLOR.PRIMARY : undefined} name={getIcon({ category, type, title })} />
        </Box>

        <View style={style.content}>
          <View style={style.row}>
            <Text numberOfLines={1} style={style.text}>
              {title}
            </Text>
            <PriceFriendly
              color={is.income ? COLOR.PRIMARY : undefined}
              currency={currency}
              highlight={is.income}
              operator={is.expense}
              value={value * operator}
            />
          </View>

          <View style={style.row}>
            <Text color={COLOR.GRAYSCALE_L} detail level={2} style={style.text}>
              {formatCaption(new Date(timestamp))}
            </Text>
            {baseCurrency !== currency && (
              <PriceFriendly
                color={COLOR.GRAYSCALE_L}
                currency={baseCurrency}
                detail
                level={2}
                operator={is.expense}
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
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  type: PropTypes.number,
  value: PropTypes.number,
};

export { TransactionItem };
