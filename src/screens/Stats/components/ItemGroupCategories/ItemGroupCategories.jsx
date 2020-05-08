import { shape, number } from 'prop-types';
import React, { useState } from 'react';
import { View } from 'react-native';
import { THEME } from 'reactor/common';
import { Touchable } from 'reactor/components';

import { Heading, HorizontalChartItem, PriceFriendly } from '@components';
import { useL10N, useStore } from '@context';

import { orderByAmount } from '../../modules';
import styles from './ItemGroupCategories.style';

const { COLOR, OPACITY } = THEME;

const ItemGroupCategories = ({ dataSource, type }) => {
  const l10n = useL10N();
  const { baseCurrency } = useStore();
  const [expand, setExpand] = useState(undefined);

  const isExpense = type === 0;
  const totals = [];
  let total = 0;
  Object.keys(dataSource).forEach((category) => {
    if (category >= 0) {
      totals[category] = Object.values(dataSource[category]).reduce((a, b) => (a += b));
      total += totals[category];
    }
  });

  const chartColor = !isExpense ? COLOR.BRAND : undefined;

  return (
    <View style={styles.container}>
      <Heading paddingHorizontal="M" value={isExpense ? l10n.EXPENSES : l10n.INCOMES}>
        <PriceFriendly bold currency={baseCurrency} value={total} />
      </Heading>
      <View>
        {orderByAmount(totals).map(({ key, amount }) => (
          <Touchable
            key={key}
            onPress={() => setExpand(expand !== key ? key : undefined)}
            style={[styles.content, expand && expand !== key && { opacity: OPACITY.S }]}
          >
            <HorizontalChartItem
              color={chartColor}
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
                    color={chartColor}
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
  dataSource: shape({}).isRequired,
  type: number.isRequired,
};

export default ItemGroupCategories;
