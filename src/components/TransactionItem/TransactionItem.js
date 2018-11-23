import { func, number, string } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';

import { C, verboseDate } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Price, Text, Touchable,
} from '../../reactor/components';
import { THEME } from '../../reactor/common';
import BulletPrice from '../BulletPrice';
import styles from './TransactionItem.style';

const {
  COLORS, FIXED, SYMBOL, TX: { TYPE: { EXPENSE } },
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

  componentWillReceiveProps() {
    this.setState({ extended: false });
  }

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
    const priceProps = {
      fixed: FIXED[currency], lighten: true, level: 2, subtitle: true, symbol: SYMBOL[currency],
    };
    const color = COLORS[category];

    return (
      <Consumer>
        { ({ l10n }) => (
          <Fragment>
            <Touchable rippleColor={color} onPress={hash ? _onToggleExtended : undefined}>
              <View style={[styles.container, isHeading && styles.heading]}>
                <View
                  style={[
                    styles.line,
                    isHeading && styles.lineHeading,
                    isBottom && !extended && styles.lineBottom,
                  ]}
                />
                <View style={[styles.bullet, hash && color && { backgroundColor: color }]} />
                <View style={styles.texts}>
                  { hash
                    ? <Text headline level={6} numberOfLines={1}>{l10n.CATEGORIES[type][category]}</Text>
                    : <Text subtitle level={3} lighten>{verboseDate(timestamp, l10n)}</Text>}

                  { title && <Text level={2} lighten numberOfLines={1}>{title}</Text> }
                </View>
                { (incomes || expenses) && (
                  <View style={styles.cashflow}>
                    { incomes !== 0 && <BulletPrice income {...priceProps} value={incomes} /> }
                    { expenses !== 0 && <BulletPrice {...priceProps} value={expenses} /> }
                  </View>
                )}
                { value && <Price {...priceProps} title={type === EXPENSE ? undefined : '+'} value={value} /> }
              </View>
            </Touchable>

            { hash && extended && (
              <Fragment>
                <View style={[styles.container, styles.extended]}>
                  <View style={styles.line} />
                  <View style={styles.bullet} />
                  <View style={styles.texts}>
                    <Text level={2} lighten>$Location</Text>
                    <Touchable rippleColor={COLOR.WHITE} onPress={() => {}}>
                      <View style={styles.map} />
                    </Touchable>
                  </View>
                </View>
                <View style={[styles.container]}>
                  <View style={[styles.line, isBottom && styles.lineBottom]} />
                  <View style={styles.bullet} />
                  <View style={styles.texts}>
                    <Button color={color} title={l10n.CLONE} small shadow style={styles.button} onPress={onClone} />
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
