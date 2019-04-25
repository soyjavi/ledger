import {
  func, number, shape, string,
} from 'prop-types';
import React, { Fragment } from 'react';
import { Image, View } from 'react-native';

import { FLAGS } from '../../../../assets';
import { C, exchange } from '../../../../common';
import { Percentage, PriceFriendly } from '../../../../components';
import { Consumer } from '../../../../context';
import { Text, Touchable } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';
import styles from './VaultCard.style';

const { COLOR } = THEME;

const { SETTINGS: { SHOW_VAULT_CURRENCY } } = C;

const VaultCard = (props) => {
  const {
    currency, onPress, currentBalance, currentMonth: { progression }, title,
  } = props;

  return (
    <Consumer>
      { ({ l10n, store: { baseCurrency, rates, settings } }) => (
        <Touchable onPress={onPress} rippleColor={COLOR.TEXT_LIGHTEN} style={styles.container}>
          <View style={styles.content}>
            <Image source={FLAGS[currency]} style={styles.thumbnail} />
            <Text caption level={2} numberOfLines={1}>{title.toUpperCase()}</Text>
            <PriceFriendly
              headline
              level={5}
              currency={baseCurrency}
              value={baseCurrency !== currency
                ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                : Math.abs(currentBalance)}
            />
            { currency !== baseCurrency && settings[SHOW_VAULT_CURRENCY] && (
              <PriceFriendly subtitle level={3} lighten currency={currency} value={currentBalance} />)}

            <View style={styles.separator} />

            <View style={styles.row}>
              { progression
                ? (
                  <Fragment>
                    <Percentage
                      subtitle
                      level={3}
                      value={currentBalance - progression > 0
                        ? (progression * 100) / (currentBalance - progression)
                        : progression}
                    />
                    <View style={styles.separator} />
                    <PriceFriendly
                      currency={baseCurrency}
                      level={3}
                      lighten
                      subtitle
                      title={progression > 0 ? '+' : '-'}
                      value={progression}
                    />
                  </Fragment>
                )
                : <Text caption lighten>{l10n.WITHOUT_TXS}</Text>
              }
            </View>
          </View>
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
  title: string,
};

VaultCard.defaultProps = {
  currentMonth: {},
  title: '',
};

export default VaultCard;
