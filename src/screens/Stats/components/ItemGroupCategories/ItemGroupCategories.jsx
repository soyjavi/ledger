import { Touchable } from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View } from 'react-native';

import { C, L10N } from '@common';
import { Heading, HorizontalChartItem, PriceFriendly } from '@components';
import { useStore } from '@context';

import { orderByAmount } from '../../modules';
import { style } from './ItemGroupCategories.style';

const {
  TX: {
    TYPE: { EXPENSE },
  },
} = C;

const ItemGroupCategories = ({ color, dataSource, type }) => {
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
    <>
      <Heading value={type === EXPENSE ? L10N.EXPENSES : L10N.INCOMES}>
        <PriceFriendly currency={baseCurrency} value={total} />
      </Heading>
      <View style={style.container}>
        {orderByAmount(totals).map(({ key, amount }) => (
          <Touchable
            key={key}
            onPress={() => setExpand(expand !== key ? key : undefined)}
            style={[style.touchable, expand && expand !== key && { opacity: 0.25 }]}
          >
            <HorizontalChartItem
              color={color}
              currency={baseCurrency}
              title={L10N.CATEGORIES[type][key]}
              value={amount}
              width={Math.floor((amount / total) * 100)}
              marginBottom="XS"
            />

            {expand === key && (
              <>
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
              </>
            )}
          </Touchable>
        ))}
      </View>
    </>
  );
};

ItemGroupCategories.propTypes = {
  color: PropTypes.string,
  dataSource: PropTypes.shape({}).isRequired,
  type: PropTypes.number.isRequired,
};

export { ItemGroupCategories };
