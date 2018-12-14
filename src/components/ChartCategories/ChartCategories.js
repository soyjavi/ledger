import {
  bool, number, shape, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Price, Text, Touchable } from '../../reactor/components';
import styles from './ChartCategories.style';

const { FIXED, SYMBOL } = C;

const Item = ({
  color, currency, extended, title, total = 0, value = 0,
}) => (
  <View style={styles.content}>
    <View style={styles.row}>
      <Text subtitle={!extended} level={extended ? 2 : 3} lighten numberOfLines={1} style={styles.text}>
        {title}
      </Text>
      <Price
        subtitle={!extended}
        level={extended ? 2 : 3}
        lighten
        fixed={FIXED[currency]}
        symbol={SYMBOL[currency]}
        value={value}
      />
    </View>
    <View style={[styles.chart, extended && styles.chartExtended]}>
      <View
        style={[
          styles.chart,
          styles.bar,
          extended && styles.chartExtended,
          { backgroundColor: color, width: `${parseInt((value * 100) / total, 10)}%` },
        ]}
      />
    </View>
  </View>
);

Item.propTypes = {
  color: string.isRequired,
  currency: string.isRequired,
  extended: bool,
  title: string.isRequired,
  total: number.isRequired,
  value: number.isRequired,
};

Item.defaultProps = {
  extended: false,
};

class ChartCategory extends PureComponent {
  static propTypes = {
    category: string.isRequired,
    // group
    l10n: shape({}).isRequired,
  };

  state = {
    extended: false,
  };

  _onPress = () => {
    const { state: { extended } } = this;
    this.setState({ extended: !extended });
  }

  render() {
    const {
      _onPress,
      props: {
        category, group, l10n, ...inherit
      },
      state: { extended },
    } = this;

    return (
      <Touchable onPress={_onPress}>
        <View style={styles.container}>
          <Item {...inherit} title={l10n[category]} />
          { extended && (
            <View>
              { Object.keys(group).map(key => (
                <Item {...inherit} key={key} extended title={key} total={inherit.value} value={group[key]} />))}
            </View>)}
        </View>
      </Touchable>
    );
  }
}

export default ChartCategory;
