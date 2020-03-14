import { func, number, string, bool } from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { FLAGS } from '../../../../assets';
import { Box, PriceFriendly } from '../../../../components';
import { useStore } from '../../../../context';
import { Row, Text, Touchable } from '../../../../reactor/components';
import { THEME } from '../../../../reactor/common';
import styles, { CURRENCYCARD_WIDTH } from './CurrencyCard.style';

const { COLOR } = THEME;

export { CURRENCYCARD_WIDTH };

export const CurrencyCard = ({ balance, base, currency, onPress, selected }) => {
  const { baseCurrency, overall } = useStore();

  return (
    <Touchable marginLeft="S" onPress={onPress} rippleColor={COLOR.LIGHTEN} style={styles.container}>
      <Box outlined={!selected} style={styles.box}>
        <View style={styles.content}>
          <Row>
            <Image source={FLAGS[currency]} style={styles.flag} />
            <Text caption numberOfLines={1} marginLeft="XS">
              {currency}
            </Text>
          </Row>
          <PriceFriendly currency={currency} subtitle value={balance} />
          {currency !== baseCurrency && (
            <PriceFriendly currency={baseCurrency} caption color={COLOR.LIGHTEN} value={base} />
          )}
          <View style={styles.expand} />
          <PriceFriendly caption currency="%" value={(base * 100) / overall.balance} />
        </View>
      </Box>
    </Touchable>
  );
};

CurrencyCard.propTypes = {
  balance: number.isRequired,
  base: number.isRequired,
  currency: string.isRequired,
  onPress: func.isRequired,
  selected: bool,
};
