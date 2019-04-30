import {
  bool, number, shape, string,
} from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';

import { CATEGORIES } from '../../assets';
import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import {
  Icon, Price, Text, Touchable,
} from '../../reactor/components';
import { THEME } from '../../reactor/common';
import { formatCaption, formatMonthShort } from './modules';
import styles from './TransactionItem.style';

const { FIXED, SYMBOL, TX: { TYPE: { INCOME } } } = C;
const { COLOR } = THEME;

class TransactionItem extends PureComponent {
  static propTypes = {
    category: number.isRequired,
    currency: string.isRequired,
    location: shape({}),
    showDate: bool,
    timestamp: string.isRequired,
    title: string,
    type: number.isRequired,
    value: number.isRequired,
  };

  static defaultProps = {
    location: undefined,
    showDate: false,
    title: undefined,
  };

  render() {
    const {
      props: {
        category, currency, location, showDate, timestamp, title, type, value,
      },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store: { baseCurrency, onSelectTx, rates } }) => (
          <Touchable rippleColor={COLOR.TEXT_LIGHTEN} onPress={() => onSelectTx(this.props)}>
            <View style={[styles.container, styles.row]}>
              <View style={styles.icon}>
                { showDate
                  ? (
                    <Fragment>
                      <Text style={styles.date}>{(new Date(timestamp)).getDate()}</Text>
                      <Text lighten style={styles.month}>{formatMonthShort(timestamp, l10n)}</Text>
                    </Fragment>
                  )
                  : <Icon value={CATEGORIES[type][category]} /> }
              </View>

              <View style={[styles.content, styles.row]}>
                <View style={styles.texts}>
                  { title && <Text subtitle level={2} numberOfLines={1}>{title}</Text> }
                  <Text caption lighten>{formatCaption(new Date(timestamp), location)}</Text>
                </View>
                <View style={styles.prices}>
                  <Price
                    subtitle
                    level={2}
                    fixed={FIXED[baseCurrency]}
                    symbol={SYMBOL[baseCurrency]}
                    title={type === INCOME ? '+' : '-'}
                    value={baseCurrency !== currency
                      ? exchange(Math.abs(value), currency, baseCurrency, rates)
                      : Math.abs(value)}
                  />

                  { baseCurrency !== currency && (
                    <Price
                      caption
                      lighten
                      fixed={FIXED[currency]}
                      symbol={SYMBOL[currency]}
                      title={type === INCOME ? '+' : '-'}
                      value={value}
                    />
                  )}
                </View>
              </View>
            </View>
          </Touchable>
        )}
      </Consumer>
    );
  }
}

export default TransactionItem;
