import {
  bool, number, shape, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { Price, Text, Touchable } from '../../reactor/components';
import Thumbnail from '../Thumbnail';
import styles from './ChartCategories.style';

const { FIXED, SYMBOL } = C;

const Item = ({
  color, currency, extended, title, total = 0, value = 0,
}) => {
  const percent = parseInt((value * 100) / total, 10);

  return (
    <View style={[styles.content, extended && styles.contentExtended]}>
      { !extended && <View style={[styles.bar, { backgroundColor: color, width: `${percent}%` }]} /> }
      <Thumbnail caption="%" color={color} title={percent > 0 ? percent.toString() : '1'} />
      <Text subtitle level={extended ? 3 : 2} numberOfLines={1} style={styles.text}>
        {title}
      </Text>
      <Price subtitle level={extended ? 3 : 2} fixed={FIXED[currency]} symbol={SYMBOL[currency]} value={value} />
    </View>
  );
};

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
    const categoryKey = category.split(':')[1];

    return (
      <View style={styles.container}>
        <Touchable onPress={group ? _onPress : undefined} rippleColor={inherit.color} style={styles.touchable}>
          <Item {...inherit} title={l10n[categoryKey]} />
        </Touchable>
        { extended && (
          <View>
            { Object.keys(group[categoryKey]).map(key => (
              <Item
                {...inherit}
                key={key}
                extended
                title={key}
                total={inherit.value}
                value={group[categoryKey][key]}
              />))}
          </View>)}
      </View>
    );
  }
}

export default ChartCategory;
