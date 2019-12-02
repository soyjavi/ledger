import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Button, Dialog, Text } from '../../reactor/components';

import {
  C, exchange, verboseMonthShort, verboseTime,
} from '../../common';
import { Consumer } from '../../context';
import Box from '../Box';
import HeatMap from '../HeatMap';
import PriceFriendly from '../PriceFriendly';
import styles from './DialogClone.style';

const { TX: { TYPE: { INCOME, EXPENSE } }, WIPE } = C;
const { COLOR } = THEME;

class DialogClone extends PureComponent {
  static propTypes = {
    dataSource: shape({}),
    visible: bool,
  };

  static defaultProps = {
    dataSource: {},
    visible: false,
  };

  constructor(props) {
    super(props);
    this.state = { busyClone: false, busyWipe: false };
  }

  _onSubmit = async ({ onTx, onSelectTx }, wipe = false) => {
    const { props: { dataSource } } = this;
    const {
      category, hash, value, vault, location, title, type = EXPENSE,
    } = dataSource;

    this.setState({ [wipe ? 'busyWipe' : 'busyClone']: true });
    let props = {
      vault, category, value, title, type,
    };

    if (wipe) {
      props = {
        ...props,
        category: WIPE,
        tx: hash,
        type: type === EXPENSE ? INCOME : EXPENSE,
      };
    } else {
      props = { ...props, ...location };
    }

    const tx = await onTx(props);
    this.setState({ [wipe ? 'busyWipe' : 'busyClone']: false });

    if (tx) onSelectTx(undefined);
  }

  render() {
    const {
      _onSubmit,
      props: {
        visible,
        dataSource: {
          category, currency, location, timestamp, title, type = EXPENSE, value,
        },
        ...inherit
      },
      state: { busyClone, busyWipe },
    } = this;
    const color = type === EXPENSE ? COLOR.EXPENSE : COLOR.INCOME;

    return (
      <Consumer>
        { ({ l10n, store: { baseCurrency, rates, ...store } }) => (
          <Dialog
            {...inherit}
            highlight
            onClose={() => store.onSelectTx(undefined)}
            style={styles.frame}
            styleContainer={styles.dialog}
            title={type === EXPENSE ? l10n.EXPENSE : l10n.INCOME}
            visible={visible}
          >
            <View style={styles.container}>
              <View style={[styles.content, styles.row]}>
                <Box style={styles.icon}>
                  <Text style={styles.date}>{(new Date(timestamp || null)).getDate()}</Text>
                  <Text lighten style={styles.month}>{verboseMonthShort(timestamp, l10n)}</Text>
                </Box>
                <View style={styles.texts}>
                  <Text subtitle style={styles.title}>{title}</Text>
                  <Text caption lighten numberOfLines={1}>
                    {`${verboseTime(new Date(timestamp))} - ${l10n.CATEGORIES[type][category]}`}
                  </Text>
                </View>
                <View style={styles.prices}>
                  <PriceFriendly
                    currency={baseCurrency}
                    operator
                    subtitle
                    value={baseCurrency !== currency
                      ? exchange(value, currency, baseCurrency, rates)
                      : value}
                  />
                  { currency !== baseCurrency && (
                    <PriceFriendly currency={currency} lighten operator value={value} />
                  )}
                </View>
              </View>

              { location && (
                <Fragment>
                  <HeatMap color={color} points={[[location.longitude, location.latitude]]} />
                  <Text caption lighten style={styles.content}>{location.place}</Text>
                </Fragment>
              )}
            </View>

            <View style={styles.row}>
              <Button
                activity={busyWipe}
                color={color}
                contained={false}
                disabled={busyWipe}
                onPress={() => _onSubmit(store, true)}
                outlined
                style={styles.button}
                title={!busyWipe ? l10n.WIPE : undefined}
              />
              <View style={styles.buttonSeparator} />
              <Button
                activity={busyClone}
                color={color}
                disabled={busyClone}
                onPress={() => _onSubmit(store, false)}
                shadow
                style={styles.button}
                title={!busyClone ? l10n.CLONE : undefined}
              />
            </View>
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogClone;
