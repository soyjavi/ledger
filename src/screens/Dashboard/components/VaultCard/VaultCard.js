import {
  func, number, shape, string,
} from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { FLAGS } from '../../../../assets';
import { exchange } from '../../../../common';
import { Box, PriceFriendly } from '../../../../components';
import { useL10N, useStore } from '../../../../context';
import { Text, Touchable } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';
import styles from './VaultCard.style';

const { COLOR } = THEME;

const VaultCard = ({
  currency, onPress, currentBalance, currentMonth: { progression }, title,
}) => {
  const l10n = useL10N();
  const { baseCurrency, rates } = useStore();

  return (
    <Touchable onPress={onPress} rippleColor={COLOR.TEXT_LIGHTEN} style={styles.container}>
      <Box>
        <View style={styles.content}>
          <View style={styles.row}>
            <Image source={FLAGS[currency]} style={styles.thumbnail} />
            <Text caption numberOfLines={1}>{title.toUpperCase()}</Text>
          </View>
          <PriceFriendly
            currency={baseCurrency}
            headline
            value={baseCurrency !== currency
              ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
              : Math.abs(currentBalance)}
          />
          { currency !== baseCurrency && (
            <PriceFriendly currency={currency} bold lighten value={currentBalance} />)}
          <View style={styles.expand} />

          <View style={styles.row}>
            { progression
              ? (
                <PriceFriendly
                  bold
                  caption
                  currency="%"
                  icon
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
