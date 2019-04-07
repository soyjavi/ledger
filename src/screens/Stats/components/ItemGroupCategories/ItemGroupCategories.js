import { arrayOf, shape, number } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { C } from '../../../../common';
import { Consumer } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Price, Text } from '../../../../reactor/components';
import HeadingItem from '../../../../components/HeadingItem';
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
    const total = {};

    Object.keys(dataSource).forEach((category) => {
      total[category] = Object.values(dataSource[category]).reduce((a, b) => a += b);
    });

    return (
      <Consumer>
        { ({ store: { baseCurrency }, l10n }) => (
          <View >
            <HeadingItem title={isExpense ? l10n.EXPENSES : l10n.INCOMES} />
            <View>
              { Object.keys(dataSource).map(category => (
                <View key={category} style={styles.container}>
                  <HeadingItem breakline subtitle={l10n.CATEGORIES[type][category]}>
                    <View style={styles.heading}>
                      <Price
                        subtitle
                        level={3}
                        fixed={FIXED[baseCurrency]}
                        symbol={SYMBOL[baseCurrency]}
                        value={total[category]}
                      />
                    </View>
                  </HeadingItem>

                  { Object.keys(dataSource[category]).map(title => (
                    <View key={`${category}-${title}`} style={styles.content}>
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
                      <View
                        style={[
                          styles.bar,
                          {
                            backgroundColor: isExpense ? COLOR.EXPENSES : COLOR.INCOMES,
                            width: `${parseInt((dataSource[category][title] * 100) / total[category], 10)}%`,
                          },
                        ]}
                      />
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
