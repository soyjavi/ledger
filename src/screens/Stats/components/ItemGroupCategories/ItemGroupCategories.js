import { shape, number } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { C } from '../../../../common';
import { Consumer } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Price, Text } from '../../../../reactor/components';
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

  render() {
    const { dataSource, type } = this.props;
    const isExpense = type === 0;
    const totalCategories = [];
    let total = 0;

    Object.keys(dataSource).forEach((category) => {
      totalCategories[category] = Object.values(dataSource[category]).reduce((a, b) => a += b);
      total += totalCategories[category];
    });

    return (
      <Consumer>
        { ({ store: { baseCurrency }, l10n }) => (
          <View style={styles.container}>
            <Heading breakline title={isExpense ? l10n.EXPENSES : l10n.INCOMES}>
              <Price
                subtitle
                level={3}
                fixed={FIXED[baseCurrency]}
                symbol={SYMBOL[baseCurrency]}
                value={total}
              />
            </Heading>
            <View>
              { Object.keys(dataSource).map(category => (
                <View key={category} style={styles.content}>
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

                  { Object.keys(dataSource[category]).map(title => (
                    <View key={`${category}-${title}`} style={styles.item}>
                      <View style={styles.row}>
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
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}
      </Consumer>
    );
  }
}

export default ItemGroupCategories;
