import { shape, number } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { PriceFriendly } from '../../../../components';
import { Consumer } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Text, Touchable } from '../../../../reactor/components';
import Heading from '../../../../components/Heading';
import styles from './ItemGroupCategories.style';

const { COLOR } = THEME;

class ItemGroupCategories extends PureComponent {
  static propTypes = {
    dataSource: shape({}).isRequired,
    type: number.isRequired,
  };

  static defaultProps = {};

  state = {
    expand: undefined,
  };

  _onPress = (category) => {
    const { state: { expand } } = this;
    this.setState({ expand: expand !== category ? category : undefined });
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
              <PriceFriendly currency={baseCurrency} subtitle level={3} value={total} />
            </Heading>
            <View style={styles.container}>
              { Object.keys(dataSource).map(category => (
                <Touchable
                  onPress={() => _onPress(category)}
                  key={category}
                  style={styles.content}
                >
                  <View>
                    <View style={styles.row}>
                      <Text subtitle level={3} style={styles.title}>{l10n.CATEGORIES[type][category]}</Text>
                      <PriceFriendly currency={baseCurrency} subtitle level={3} value={totalCategories[category]} />
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

                  { expand === category && Object.keys(dataSource[category]).map(title => (
                    <View key={`${category}-${title}`} style={styles.row}>
                      <Text level={2} lighten style={styles.title}>{title}</Text>
                      <PriceFriendly
                        currency={baseCurrency}
                        subtitle
                        level={3}
                        lighten
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
