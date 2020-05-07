import { number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Col, Icon, Row, Text, Touchable } from 'reactor/components';

import { C, exchange, getIconCategory } from '@common';
import { useNavigation, useSettings, useStore } from '@context';

import { Box } from '../Box';
import { PriceFriendly } from '../PriceFriendly';
import { formatCaption } from './modules';
import styles from './TransactionItem.style';

const {
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;
const { COLOR, SPACE } = THEME;

const TransactionItem = (props) => {
  const { baseCurrency, rates } = useStore();
  const { showTx } = useNavigation();
  const {
    state: { maskAmount },
  } = useSettings();

  const { category, currency, location, timestamp, title, type, value } = props;
  const operator = type === EXPENSE ? -1 : 1;

  return (
    <Touchable rippleColor={COLOR.TEXT} onPress={() => showTx(props)}>
      <Row align="start" paddingHorizontal="M" paddingVertical="S">
        <Col marginRight="S" width="auto">
          <Box small>
            <Icon family="MaterialCommunityIcons" size={SPACE.M} value={getIconCategory({ type, category, title })} />
          </Box>
        </Col>

        <Col>
          <Row>
            <Col>
              <Text bold numberOfLines={1}>
                {title}
              </Text>
            </Col>
            <Col width="auto" style={type === INCOME && !maskAmount ? styles.highlight : undefined}>
              <PriceFriendly
                bold
                color={type === INCOME ? COLOR.BRAND : undefined}
                currency={baseCurrency}
                operator={type === EXPENSE}
                value={exchange(value, currency, baseCurrency, rates, timestamp) * operator}
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
                  currency={currency}
                  operator={type === EXPENSE}
                  value={value * operator}
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
  category: number.isRequired,
  currency: string.isRequired,
  location: shape({}),
  timestamp: oneOfType([string, number]).isRequired,
  title: string,
  type: number,
  value: number.isRequired,
};

TransactionItem.defaultProps = {
  location: undefined,
  title: undefined,
  type: EXPENSE,
};

export { TransactionItem };
