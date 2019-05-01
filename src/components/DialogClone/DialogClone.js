import { bool, shape } from 'prop-types';
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

const {
  FIXED, SYMBOL, TX: { TYPE: { INCOME, EXPENSE } }, WIPE,
} = C;
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

  state = {
    busyClone: false,
    busyWipe: false,
  };

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
          category, currency, location, title, type = EXPENSE, value,
        },
      },
      state: { busyClone, busyWipe },
    } = this;

    return (
      <Consumer>
        { ({ l10n, store: { baseCurrency, rates, ...store } }) => (
          <Dialog
            onClose={() => store.onSelectTx(undefined)}
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
                <View style={styles.texts}>
                  <Text subtitle level={2} style={styles.title}>{title}</Text>
                  <Text caption lighten numberOfLines={1}>{l10n.CATEGORIES[type][category]}</Text>
                </View>
                <View style={styles.prices}>
                  <Price
                    subtitle
                    level={2}
                    fixed={FIXED[baseCurrency]}
                    symbol={SYMBOL[baseCurrency]}
                    value={baseCurrency !== currency
                      ? exchange(value, currency, baseCurrency, rates)
                      : value}
                  />
                  { currency !== baseCurrency && (
                    <Price caption lighten fixed={FIXED[currency]} symbol={SYMBOL[currency]} value={value} />
                  )}
                </View>
              </View>
              { location && <MapStaticImage {...location} style={styles.map} /> }
              { location && <Text caption lighten>{location.place}</Text> }
            </View>

            <View style={styles.row}>
              <Button
                activity={busyWipe}
                color={COLOR.PRIMARY}
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
                color={COLOR.PRIMARY}
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
