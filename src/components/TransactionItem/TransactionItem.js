import {
  bool, number, shape, string,
} from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Icon, Text, Touchable } from '../../reactor/components';

import {
  C, exchange, getIconCategory, verboseMonthShort,
} from '../../common';
import { Consumer } from '../../context';
import PriceFriendly from '../PriceFriendly';
import { formatCaption } from './modules';
import styles from './TransactionItem.style';

const { VAULT_TRANSFER } = C;
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
    const isVaultTransfer = category === VAULT_TRANSFER;

    return (
      <Consumer>
        { ({ l10n, store: { baseCurrency, onSelectTx, rates } }) => (
          <Touchable rippleColor={COLOR.TEXT_LIGHTEN} onPress={() => onSelectTx(this.props)}>
            <View style={[styles.container, styles.row, isVaultTransfer && styles.containerHighlight]}>
              <View style={styles.icon}>
                { showDate
                  ? (
                    <Fragment>
                      <Text style={styles.date}>{(new Date(timestamp)).getDate()}</Text>
                      <Text lighten style={styles.month}>{verboseMonthShort(timestamp, l10n)}</Text>
                    </Fragment>
                  )
                  : <Icon value={getIconCategory({ type, category, title })} /> }
              </View>

              <View style={[styles.content, styles.row]}>
                <View style={styles.texts}>
                  { title && <Text subtitle level={2} lighten={isVaultTransfer} numberOfLines={1}>{title}</Text> }
                  <Text caption lighten>{formatCaption(new Date(timestamp), location)}</Text>
                </View>
                <View style={styles.prices}>
                  <PriceFriendly
                    currency={baseCurrency}
                    subtitle
                    level={2}
                    lighten={isVaultTransfer}
                    operator
                    value={exchange(value, currency, baseCurrency, rates, timestamp)}
                  />

                  { baseCurrency !== currency && (
                    <PriceFriendly
                      caption
                      currency={currency}
                      lighten
                      operator
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
