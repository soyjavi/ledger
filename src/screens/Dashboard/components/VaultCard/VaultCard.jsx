import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { Row, Text, Touchable } from 'reactor/components';
import { THEME } from 'reactor/common';

import { FLAGS } from '@assets';
import { exchange } from '@common';
import { Box, PriceFriendly } from '@components';
import { useL10N, useStore } from '@context';

import styles, { VAULTCARD_WIDTH } from './VaultCard.style';

const { COLOR } = THEME;

export { VAULTCARD_WIDTH };

export const VaultCard = ({
  currency,
  onPress,
  currentBalance,
  currentMonth: { progression },
  title = '',
  ...others
}) => {
  const l10n = useL10N();
  const { baseCurrency, rates } = useStore();

  return React.useCallback(
    <Touchable {...others} onPress={onPress} rippleColor={COLOR.LIGHTEN} style={styles.container}>
      <Box outlined={!progression} style={styles.box}>
        <View style={styles.content}>
          <Row>
            <Image source={FLAGS[currency]} style={styles.flag} />
            <Text caption numberOfLines={1} marginLeft="XS" style={styles.title}>
              {title}
            </Text>
          </Row>
          <PriceFriendly
            bold
            currency={baseCurrency}
            value={
              baseCurrency !== currency
                ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                : Math.abs(currentBalance)
            }
          />
          {currency !== baseCurrency && (
            <PriceFriendly currency={currency} caption color={COLOR.LIGHTEN} value={currentBalance} />
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
            <Text caption color={COLOR.LIGHTEN}>
              {l10n.WITHOUT_TXS}
            </Text>
          )}
        </View>
      </Box>
    </Touchable>,
    [currency, currentBalance, progression],
  );
};

VaultCard.propTypes = {
  currency: PropTypes.string.isRequired,
  currentBalance: PropTypes.number.isRequired,
  currentMonth: PropTypes.shape({}),
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
};
