import {
  bool, func, shape, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import {
  Button, Dialog, Price, Text,
} from '../../reactor/components';
import MapStaticImage from '../MapStaticImage';

import styles from './DialogClone.style';

const { FIXED, SYMBOL, TX: { TYPE: { INCOME, EXPENSE } }, WIPE } = C;
const { COLOR } = THEME;

class DialogClone extends PureComponent {
  static propTypes = {
    currency: string.isRequired,
    dataSource: shape({}),
    onClose: func.isRequired,
    visible: bool,
  };

  static defaultProps = {
    dataSource: {},
    visible: false,
  };

  state = {
    busyClone: false,
    busyWipe: false,
  };

  _onSubmit = async ({ onTransaction }, wipe = false) => {
    const { props: { dataSource, onClose } } = this;
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

    const tx = await onTransaction(props);
    this.setState({ [wipe ? 'busyWipe' : 'busyClone']: false });

    if (tx) onClose();
  }

  render() {
    const {
      _onSubmit,
      props: {
        currency, onClose, visible,
        dataSource: {
          category, location, title, type = EXPENSE, value,
        },
      },
      state: { busyClone, busyWipe },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store: { baseCurrency, rates, ...store } }) => (
          <Dialog
            onClose={onClose}
            style={styles.frame}
            styleContainer={styles.dialog}
            title={type === EXPENSE ? l10n.EXPENSE : l10n.INCOME}
            visible={visible}
          >
            <Text lighten level={2}>
              {l10n.CLONE_CAPTION}
            </Text>

            <View style={styles.info}>
              <View style={styles.row}>
                <Text subtitle level={2} style={styles.title}>{title}</Text>
                <Price
                  subtitle
                  level={2}
                  fixed={FIXED[baseCurrency]}
                  symbol={SYMBOL[baseCurrency]}
                  title={type === INCOME ? '+' : undefined}
                  value={baseCurrency !== currency
                    ? exchange(Math.abs(value), currency, baseCurrency, rates)
                    : Math.abs(value)}
                />
              </View>
              <Text caption lighten numberOfLines={1}>{l10n.CATEGORIES[type][category]}</Text>
              { location && <MapStaticImage {...location} style={styles.map} /> }
              { location && <Text caption lighten>{location.place}</Text> }
            </View>

            <View style={styles.row}>
              <Button
                activity={busyWipe}
                contained={false}
                onPress={() => _onSubmit(store, true)}
                outlined
                style={styles.button}
                title={!busyWipe ? l10n.WIPE : undefined}
              />
              <View style={styles.buttonSeparator} />
              <Button
                activity={busyClone}
                color={type === EXPENSE ? COLOR.EXPENSES : COLOR.INCOMES}
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
