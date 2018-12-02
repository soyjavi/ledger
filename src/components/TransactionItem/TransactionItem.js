import { func, number, string } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';

import { iconPlace, iconTime } from '../../assets';
import { C, verboseDate } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Icon, Price, Text, Touchable,
} from '../../reactor/components';
import { THEME } from '../../reactor/common';
import BulletPrice from '../BulletPrice';
import styles from './TransactionItem.style';

const {
  COLORS, FIXED, SYMBOL, TX: { TYPE: { EXPENSE, INCOME, TRANSFER_EXPENSE } },
} = C;
const { COLOR } = THEME;

class TransactionItem extends PureComponent {
  static propTypes = {
    category: number,
    currency: string,
    hash: string,
    onClone: func,
    timestamp: string.isRequired,
    title: string,
    type: number,
    value: number,
    vault: string,
  };

  static defaultProps = {
    category: undefined,
    currency: undefined,
    hash: undefined,
    onClone: undefined,
    title: undefined,
    type: undefined,
    value: undefined,
    vault: undefined,
  };

  state = {
    extended: false,
  };

  _onToggleExtended = () => {
    const { state: { extended } } = this;
    this.setState({ extended: !extended });
  }

  render() {
    const {
      _onToggleExtended,
      props: {
        category, currency, hash, onClone, timestamp, title, type, value, vault, ...inherit
      },
      state: { extended },
    } = this;

    const isHeading = !hash;
    const isBottom = inherit.last;
    const { incomes, expenses } = inherit.cashflow || {};
    const color = COLORS[category];
    const time = new Date(timestamp);

    return (
      <Consumer>
        { ({ l10n }) => (
          <Fragment>
            <Touchable rippleColor={color} onPress={hash ? _onToggleExtended : undefined}>
              <View style={[styles.row, styles.container, isHeading && styles.heading]}>
                <View
                  style={[
                    styles.line,
                    isHeading && styles.lineHeading,
                    isBottom && !extended && styles.lineBottom,
                  ]}
                />
                <View style={[styles.bullet, hash && color && { backgroundColor: color }]} />
                <View style={styles.texts}>
                  { hash && (type === EXPENSE || type === INCOME) && (
                    <Text headline level={6} numberOfLines={1}>{l10n.CATEGORIES[type][category]}</Text>)}
                  { hash && type !== EXPENSE && type !== INCOME && (
                    <Text headline level={6} numberOfLines={1}>
                      {`${l10n.TRANSFER} ${type === TRANSFER_EXPENSE ? l10n.TO : l10n.FROM} ${title}`}
                    </Text>)}
                  { !hash && <Text subtitle level={3} lighten>{verboseDate(timestamp, l10n)}</Text> }
                  { (type === EXPENSE || type === INCOME) && title && (
                    <Text level={2} lighten numberOfLines={1}>{title}</Text>)}
                </View>
                <View style={styles.row}>
                  { incomes > 0 && (
                    <BulletPrice currency={currency} incomes value={incomes} style={styles.bulletPrice} />)}
                  { expenses > 0 && (
                    <BulletPrice currency={currency} value={expenses} style={styles.bulletPrice} />)}
                </View>
                { value && (
                  <Price
                    fixed={FIXED[currency]}
                    headline
                    level={6}
                    symbol={SYMBOL[currency]}
                    title={type === EXPENSE || type === TRANSFER_EXPENSE ? undefined : '+'}
                    value={value}
                  />)}
              </View>
            </Touchable>

            { hash && extended && (
              <Fragment>
                <View style={[styles.row, styles.container, styles.extended]}>
                  <View style={styles.line} />
                  <View style={styles.bullet} />
                  <View style={[styles.row, styles.texts]}>
                    <Icon value={iconTime} style={styles.icon} />
                    <Text level={2} lighten>{`${time.getHours()}:${time.getMinutes()}`}</Text>
                  </View>
                </View>
                <View style={[styles.row, styles.container, styles.extended]}>
                  <View style={styles.line} />
                  <View style={styles.bullet} />
                  <View style={styles.texts}>
                    <Touchable rippleColor={COLOR.WHITE} onPress={() => {}}>
                      <View style={styles.map} />
                    </Touchable>
                    <View style={styles.row}>
                      <Icon value={iconPlace} style={styles.icon} />
                      <Text level={2} lighten>$Location</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.row, styles.container, styles.extended]}>
                  <View style={[styles.line, isBottom && styles.lineBottom]} />
                  <View style={styles.bullet} />
                  <View style={styles.texts}>
                    <Button
                      color={color}
                      rounded
                      title={l10n.CLONE}
                      shadow
                      small
                      style={styles.button}
                      onPress={onClone}
                    />
                  </View>
                </View>
              </Fragment>
            )}
          </Fragment>
        )}
      </Consumer>
    );
  }
}

export default TransactionItem;
