import {
  func, number, shape, string,
} from 'prop-types';
import React, { Fragment, Component } from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { C, verboseDate } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Icon, Price, Text, Touchable,
} from '../../reactor/components';
import { THEME } from '../../reactor/common';
import MapStaticImage from '../MapStaticImage';
import formatTime from './modules/formatTime';
import styles from './TransactionItem.style';

const { iconPlace, iconTime } = ASSETS;
const {
  VAULT_TRANSFER, FIXED, SYMBOL, TX: { TYPE: { EXPENSE } },
} = C;
const { COLOR } = THEME;

class TransactionItem extends Component {
  static propTypes = {
    category: number,
    currency: string,
    hash: string,
    location: shape({}),
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
    location: undefined,
    onClone: undefined,
    title: undefined,
    type: undefined,
    value: undefined,
    vault: undefined,
  };

  state = {
    extended: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { props: { currency, hash }, state: { extended } } = this;
    return hash !== nextProps.hash || currency !== nextProps.currency || extended !== nextState.extended;
  }

  _onToggleExtended = () => {
    const { state: { extended } } = this;
    this.setState({ extended: !extended });
  }

  render() {
    const {
      _onToggleExtended,
      props: {
        category, currency, hash, location, onClone, timestamp, title, type, value, vault, ...inherit
      },
      state: { extended },
    } = this;

    const isHeading = !hash;
    const regular = category !== VAULT_TRANSFER;
    const color = regular ? inherit.color : COLOR.TEXT;
    const time = new Date(timestamp);

    return (
      <Consumer>
        { ({ l10n }) => (
          <Fragment>
            <Touchable rippleColor={color} onPress={hash ? _onToggleExtended : undefined}>
              <View style={[styles.container, isHeading && styles.heading]}>
                <View style={[styles.row, styles.content]}>
                  { !isHeading && <Icon value={ASSETS[`iconType${type}Category${category}`]} style={styles.icon} /> }

                  <View style={styles.texts}>
                    { !isHeading && regular && (
                      <Text subtitle level={2} numberOfLines={1}>{l10n.CATEGORIES[type][category]}</Text>)}
                    { !isHeading && !regular && (
                      <Text subtitle level={2} numberOfLines={1}>
                        {`${l10n.TRANSFER} ${type === EXPENSE ? l10n.TO : l10n.FROM} ${title}`}
                      </Text>)}
                    { isHeading && <Text level={2} lighten subtitle>{verboseDate(timestamp, l10n)}</Text> }
                    { title && regular && <Text level={2} lighten numberOfLines={1}>{title}</Text> }
                  </View>
                  <Price
                    headline={!isHeading}
                    subtitle={isHeading}
                    level={!isHeading ? 6 : 2}
                    lighten={isHeading}
                    fixed={FIXED[currency]}
                    symbol={SYMBOL[currency]}
                    title={!isHeading ? (type === EXPENSE ? undefined : '+') : undefined}
                    value={isHeading ? inherit.progression : value}
                  />
                </View>
              </View>
            </Touchable>

            { hash && extended && (
              <View style={[styles.container, styles.extended]}>
                <View style={styles.row}>
                  <Icon value={iconTime} style={[styles.icon, styles.iconExtended]} />
                  <Text level={2} lighten>{formatTime(time)}</Text>
                </View>
                { location && (
                  <View style={styles.row}>
                    <Icon value={iconPlace} style={[styles.icon, styles.iconExtended]} />
                    <View style={styles.texts}>
                      <Text level={2} lighten>{location.place}</Text>
                      <MapStaticImage {...location} />
                    </View>
                  </View>)}
                <Button color={COLOR.PRIMARY} onPress={onClone} shadow small style={styles.button} title={l10n.CLONE} />
              </View>
            )}
          </Fragment>
        )}
      </Consumer>
    );
  }
}

export default TransactionItem;
