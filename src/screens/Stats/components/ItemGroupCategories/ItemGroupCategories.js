import { shape, number } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { HorizontalChartItem, PriceFriendly } from '../../../../components';
import { Consumer } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Touchable } from '../../../../reactor/components';
import Heading from '../../../../components/Heading';
import { orderByAmount } from '../../modules';
import styles from './ItemGroupCategories.style';

const { COLOR } = THEME;

class ItemGroupCategories extends PureComponent {
  static propTypes = {
    dataSource: shape({}).isRequired,
    type: number.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = { expand: undefined };
  }

  _onPress = (category) => {
    const { state: { expand } } = this;
    this.setState({ expand: expand !== category ? category : undefined });
  }

  render() {
    const { _onPress, props: { dataSource, type }, state: { expand } } = this;
    const isExpense = type === 0;
    const totals = [];
    let total = 0;

    Object.keys(dataSource).forEach((category) => {
      if (category >= 0) {
        totals[category] = Object.values(dataSource[category]).reduce((a, b) => a += b); // eslint-disable-line
        total += totals[category];
      }
    });

    return (
      <Consumer>
        { ({ store: { baseCurrency }, l10n }) => (
          <View style={styles.container}>
            <Heading subtitle={isExpense ? l10n.EXPENSES : l10n.INCOMES}>
              <PriceFriendly currency={baseCurrency} bold value={total} />
            </Heading>
            <View>
              { orderByAmount(totals).map(({ key, amount }) => (
                <Touchable key={key} onPress={() => _onPress(key)} style={styles.content}>
                  <HorizontalChartItem
                    color={isExpense ? COLOR.EXPENSE : COLOR.INCOME}
                    currency={baseCurrency}
                    title={l10n.CATEGORIES[type][key]}
                    value={amount}
                    width={Math.floor((amount / total) * 100)}
                  />

                  { expand === key && (
                    <View style={styles.expand}>
                      { orderByAmount(dataSource[key]).map((item) => (
                        <HorizontalChartItem
                          key={`${key}-${item.key}`}
                          color={COLOR.TEXT_LIGHTEN}
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
        )}
      </Consumer>
    );
  }
}

export default ItemGroupCategories;
