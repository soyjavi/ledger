import { bool, number, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import { FLAGS } from '../../../../assets';
import { exchange } from '../../../../common';
import { PriceFriendly } from '../../../../components';
import { Consumer } from '../../../../context';
import { InputOption, Text } from '../../../../reactor/components';
import styles from './VaultItem.style';

class VaultItem extends PureComponent {
  static propTypes = {
    active: bool,
    currency: string.isRequired,
    currentBalance: number.isRequired,
    title: string,
  };

  static defaultProps = {
    active: true,
    title: '',
  };

  _onChange = (value, { onVaultUpdate }) => {
    const { props } = this;

    onVaultUpdate({ ...props, active: value });
  }

  render() {
    const {
      _onChange,
      props: {
        active, currency, currentBalance, title,
      },
    } = this;

    return (
      <Consumer>
        { ({ store: { baseCurrency, rates, ...store} }) => (
          <View style={styles.container}>
            <Image source={FLAGS[currency]} style={styles.thumbnail} />
            <View style={styles.content}>
              <Text subtitle level={2} numberOfLines={1}>{title}</Text>
              <PriceFriendly
                caption
                lighten
                currency={baseCurrency}
                value={baseCurrency !== currency
                  ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                  : Math.abs(currentBalance)}
              />
            </View>
            <InputOption onChange={value => _onChange(value, store)} style={styles.switch} value={active} />
          </View>
        )}
      </Consumer>
    );
  }
}

export default VaultItem;
