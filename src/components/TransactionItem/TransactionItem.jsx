import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Col, Icon, Row, Text, Touchable } from 'reactor/components';

import { C, exchange } from '@common';
import { useStore } from '@context';

import { Box } from '../Box';
import { PriceFriendly } from '../PriceFriendly';
import { formatCaption } from './modules';

const {
  CATEGORY_ICON,
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;
const { COLOR, ICON, SPACE } = THEME;

const TransactionItem = (props) => {
  const {
    settings: { baseCurrency },
    rates,
  } = useStore();
  const { category = 99, currency, location, timestamp, title, type = EXPENSE, value, onPress } = props;
  const operator = type === EXPENSE ? -1 : 1;

  return (
    <Touchable
      containerBorderRadius={0}
      rippleColor={COLOR.LIGHTEN}
      onPress={onPress ? () => onPress(props) : undefined}
    >
      <Row align="center" paddingHorizontal="M" paddingVertical="S">
        <Col marginRight="S" width="auto">
          <Box color={COLOR.BASE}>
            <Icon family={ICON.FAMILY} size={SPACE.M} value={CATEGORY_ICON[type][category]} />
          </Box>
        </Col>

        <Col>
          <Row>
            <Col>
              <Text numberOfLines={1}>{title}</Text>
            </Col>
            <Col width="auto">
              <PriceFriendly
                color={type === INCOME ? COLOR.BRAND : undefined}
                currency={currency}
                highlight={type === INCOME}
                operator={type === EXPENSE}
                value={value * operator}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Text caption color={COLOR.LIGHTEN}>
                {formatCaption(new Date(timestamp), location)}
              </Text>
            </Col>
            <Col width="auto">
              {baseCurrency !== currency && (
                <PriceFriendly
                  caption
                  color={COLOR.LIGHTEN}
                  currency={baseCurrency}
                  operator={type === EXPENSE}
                  value={exchange(value, currency, baseCurrency, rates, timestamp) * operator}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
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
