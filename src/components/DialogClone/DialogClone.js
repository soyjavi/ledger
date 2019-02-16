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

const { FIXED, SYMBOL, TX: { TYPE: { INCOME, EXPENSE } } } = C;
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
    busy: false,
  };

  _onSubmit = async ({ onTransaction }) => {
    const {
      dataSource: {
        vault, category, location, value, title, type,
      },
      onClose,
    } = this.props;

    this.setState({ busy: true });
    const tx = await onTransaction({
      vault, category, value, title, type, ...location,
    });
    this.setState({ busy: false });

    if (tx) onClose();
  }

  render() {
    const {
      _onSubmit,
      props: {
        currency, onClose, visible,
        dataSource: {
          category, location, title, type = 0, value,
        },
      },
      state: { busy },
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

            <Button
              activity={busy}
              color={type === EXPENSE ? COLOR.EXPENSES : COLOR.INCOMES}
              disabled={busy}
              onPress={() => _onSubmit(store)}
              rounded
              shadow
              style={styles.button}
              title={`${l10n.CLONE} ${l10n.TRANSACTION}`}
            />
          </Dialog>
        )}
      </Consumer>
    );
  }
}

export default DialogClone;
