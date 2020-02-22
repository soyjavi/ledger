import { func, number, shape, string } from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { FLAGS } from '../../../../assets';
import { exchange } from '../../../../common';
import { Box, PriceFriendly } from '../../../../components';
import { useL10N, useStore } from '../../../../context';
import { Row, Text, Touchable } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';
import styles from './VaultCard.style';

const { COLOR, SPACE, OPACITY } = THEME;

const VaultCard = ({ currency, onPress, currentBalance, currentMonth: { progression }, title }) => {
  const l10n = useL10N();
  const { baseCurrency, rates } = useStore();

  return React.useCallback(
    <Touchable marginLeft="S" onPress={onPress} rippleColor={COLOR[currency] || COLOR.LIGHTEN} style={styles.container}>
      <Box
        borderRadius={SPACE.S}
        color={progression ? COLOR[currency] : undefined}
        opacity={progression ? OPACITY.M : undefined}
        outlined={!progression}
        style={styles.box}
      >
        <View style={styles.content}>
          <Row>
            <Image source={FLAGS[currency]} style={styles.thumbnail} />
            <Text caption numberOfLines={1} marginLeft="XS">
              {title.toUpperCase()}
            </Text>
          </Row>
          <PriceFriendly
            currency={baseCurrency}
            subtitle
            value={
              baseCurrency !== currency
                ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                : Math.abs(currentBalance)
            }
          />
          {currency !== baseCurrency && (
            <PriceFriendly currency={currency} caption value={currentBalance} style={styles.balance} />
          )}

          <View style={styles.expand} />

          {progression ? (
            <PriceFriendly
              caption
              currency="%"
              operator
              value={
                currentBalance - progression > 0 ? (progression * 100) / (currentBalance - progression) : progression
              }
            />
          ) : (
            <Text caption>{l10n.WITHOUT_TXS}</Text>
          )}
        </View>
      </Box>
    </Touchable>,
    [currency, currentBalance, progression],
  );
};

VaultCard.propTypes = {
  currency: string.isRequired,
  currentBalance: number.isRequired,
  currentMonth: shape({}),
  onPress: func.isRequired,
  title: string,
};

VaultCard.defaultProps = {
  currentMonth: {},
  title: '',
};

export default VaultCard;
