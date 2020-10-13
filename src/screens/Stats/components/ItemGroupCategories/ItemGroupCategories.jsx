import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View } from 'react-native';
import { THEME } from 'reactor/common';
import { Touchable } from 'reactor/components';

import { C } from '@common';
import { Heading, HorizontalChartItem, PriceFriendly } from '@components';
import { useL10N, useStore } from '@context';

import { orderByAmount } from '../../modules';
import styles from './ItemGroupCategories.style';

const {
  TX: {
    TYPE: { EXPENSE },
  },
} = C;
const { COLOR, OPACITY } = THEME;

const ItemGroupCategories = ({ color, dataSource, type }) => {
  const l10n = useL10N();
  const {
    settings: { baseCurrency },
  } = useStore();
  const [expand, setExpand] = useState(undefined);

  const totals = [];
  let total = 0;
  Object.keys(dataSource).forEach((category) => {
    if (category >= 0) {
      totals[category] = Object.values(dataSource[category]).reduce((a, b) => (a += b));
      total += totals[category];
    }
  });

  return (
    <View style={styles.container}>
      <Heading paddingHorizontal="M" value={type === EXPENSE ? l10n.EXPENSES : l10n.INCOMES}>
        <PriceFriendly bold currency={baseCurrency} value={total} />
      </Heading>
      <View>
        {orderByAmount(totals).map(({ key, amount }) => (
          <Touchable
            key={key}
            onPress={() => setExpand(expand !== key ? key : undefined)}
            rippleColor={COLOR.RIPPLE}
            style={[styles.content, expand && expand !== key && { opacity: OPACITY.S }]}
          >
            <HorizontalChartItem
              color={color}
              currency={baseCurrency}
              title={l10n.CATEGORIES[type][key]}
              value={amount}
              width={Math.floor((amount / total) * 100)}
              marginBottom="XS"
            />

            {expand === key && (
              <View style={styles.expand}>
                {orderByAmount(dataSource[key]).map((item) => (
                  <HorizontalChartItem
                    key={`${key}-${item.key}`}
                    color={color}
                    currency={baseCurrency}
                    small
                    title={item.key}
                    value={item.amount}
                    width={Math.floor((item.amount / amount) * 100)}
                  />
                ))}
              </View>
            )}
          </Touchable>
        ))}
      </View>
    </View>
  );
};

ItemGroupCategories.propTypes = {
  color: PropTypes.string,
  dataSource: PropTypes.shape({}).isRequired,
  type: PropTypes.number.isRequired,
};

export { ItemGroupCategories };
