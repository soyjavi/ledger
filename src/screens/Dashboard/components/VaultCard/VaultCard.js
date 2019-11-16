import {
  bool, func, number, shape, string,
} from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { FLAGS } from '../../../../assets';
import { C, exchange } from '../../../../common';
import { Box, PriceFriendly } from '../../../../components';
import { Consumer } from '../../../../context';
import { Text, Touchable } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';
import styles from './VaultCard.style';

const { COLOR } = THEME;

const { SETTINGS: { SHOW_VAULT_CURRENCY } } = C;

const VaultCard = (props) => {
  const {
    currency, onPress, currentBalance, currentMonth: { progression }, mask, title,
  } = props;

  return (
    <Consumer>
      { ({ l10n, store: { baseCurrency, rates, settings } }) => (
        <Touchable onPress={onPress} rippleColor={COLOR.TEXT_LIGHTEN} style={styles.container}>
          <Box>
            <View style={styles.content}>
              <View style={styles.row}>
                <Image source={FLAGS[currency]} style={styles.thumbnail} />
                <Text caption level={2} numberOfLines={1}>{title.toUpperCase()}</Text>
              </View>
              <PriceFriendly
                currency={baseCurrency}
                headline
                level={5}
                mask={mask}
                value={baseCurrency !== currency
                  ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                  : Math.abs(currentBalance)}
              />
              { currency !== baseCurrency && settings[SHOW_VAULT_CURRENCY] && (
                <PriceFriendly currency={currency} subtitle level={3} lighten mask={mask} value={currentBalance} />)}
              <View style={styles.expand} />

              <View style={styles.row}>
                { progression
                  ? (
                    <PriceFriendly
                      currency="%"
                      icon
                      level={3}
                      subtitle
                      value={currentBalance - progression > 0
                        ? (progression * 100) / (currentBalance - progression)
                        : progression}
                    />
                  )
                  : <Text caption lighten>{l10n.WITHOUT_TXS}</Text>}
              </View>
            </View>
          </Box>
        </Touchable>
      )}
    </Consumer>

  );
};

VaultCard.propTypes = {
  currency: string.isRequired,
  onPress: func.isRequired,
  currentBalance: number.isRequired,
  currentMonth: shape({}),
  mask: bool,
  title: string,
};

VaultCard.defaultProps = {
  currentMonth: {},
  mask: false,
  title: '',
};

export default VaultCard;
