import { shape, number } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { C } from '../../../../common';
import { Consumer } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Price, Text, Touchable } from '../../../../reactor/components';
import Heading from '../../../../components/Heading';
import styles from './ItemGroupCategories.style';

const { COLOR } = THEME;
const { FIXED, SYMBOL } = C;

class ItemGroupCategories extends PureComponent {
  static propTypes = {
    dataSource: shape({}).isRequired,
    type: number.isRequired,
  };

  static defaultProps = {};

  state = {
    expand: false,
  };

  _onPress = () => {
    const { state: { expand } } = this;
    this.setState({ expand: !expand });
  }

  render() {
    const { _onPress, props: { dataSource, type }, state: { expand } } = this;
    const isExpense = type === 0;
    const totalCategories = [];
    let total = 0;

    Object.keys(dataSource).forEach((category) => {
      totalCategories[category] = Object.values(dataSource[category]).reduce((a, b) => a += b); // eslint-disable-line
      total += totalCategories[category];
    });

    return (
      <Consumer>
        { ({ store: { baseCurrency }, l10n }) => (
          <View>
            <Heading breakline title={isExpense ? l10n.EXPENSES : l10n.INCOMES}>
              <Price
                subtitle
                level={3}
                fixed={FIXED[baseCurrency]}
                symbol={SYMBOL[baseCurrency]}
                value={total}
              />
            </Heading>
            <View style={styles.container}>
              { Object.keys(dataSource).map(category => (
                <Touchable onPress={_onPress} key={category} style={styles.content}>
                  <View>
                    <View style={styles.row}>
                      <Text subtitle level={3} style={styles.title}>{l10n.CATEGORIES[type][category]}</Text>
                      <Price
                        subtitle
                        level={3}
                        fixed={FIXED[baseCurrency]}
                        symbol={SYMBOL[baseCurrency]}
                        value={totalCategories[category]}
                      />
                    </View>

                    <View style={[styles.bar, styles.barContainer]}>
                      <View
                        style={[
                          styles.bar,
                          {
                            backgroundColor: isExpense ? COLOR.EXPENSES : COLOR.INCOMES,
                            width: `${parseInt((totalCategories[category] * 100) / total, 10)}%`,
                          },
                        ]}
                      />
                    </View>
                  </View>

                  { expand && Object.keys(dataSource[category]).map(title => (
                    <View key={`${category}-${title}`} style={styles.row}>
                      <Text level={2} lighten style={styles.title}>{title}</Text>
                      <Price
                        subtitle
                        level={3}
                        lighten
                        fixed={FIXED[baseCurrency]}
                        symbol={SYMBOL[baseCurrency]}
                        value={dataSource[category][title]}
                      />
                    </View>
                  ))}
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
