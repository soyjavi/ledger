import PropTypes from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';
import { Row, Text, Touchable } from 'reactor/components';
import { THEME } from 'reactor/common';

import { FLAGS } from '@assets';
import { exchange } from '@common';
import { useL10N, useStore } from '@context';

import { Box } from '../Box';
import { PriceFriendly } from '../PriceFriendly';
import styles, { CARD_WIDTH } from './Card.style';

const { COLOR } = THEME;

export { CARD_WIDTH };

export const Card = ({ balance, currency, disabled, onPress, percentage, title = '', ...others }) => {
  const l10n = useL10N();
  const { baseCurrency, rates } = useStore();

  return (
    <Touchable {...others} onPress={onPress} rippleColor={COLOR.LIGHTEN} style={styles.container}>
      <Box outlined={disabled} style={styles.box}>
        <View style={styles.content}>
          <Row marginBottom="XS">
            <Image source={FLAGS[currency]} style={styles.flag} />
            <Text numberOfLines={1} marginLeft="XS" style={[styles.text, styles.title]}>
              {title}
            </Text>
          </Row>
          <PriceFriendly subtitle currency={currency} style={[styles.text, styles.balance]} value={balance} />
          {currency !== baseCurrency && (
            <PriceFriendly
              currency={baseCurrency}
              bold
              caption
              color={COLOR.LIGHTEN}
              value={exchange(Math.abs(balance), currency, baseCurrency, rates)}
            />
          )}

          <View style={styles.expand} />

          {percentage ? (
            <PriceFriendly caption currency="%" operator value={percentage} />
          ) : (
            <Text caption color={COLOR.LIGHTEN}>
              {l10n.WITHOUT_TXS}
            </Text>
          )}
        </View>
      </Box>
    </Touchable>
  );
};

Card.propTypes = {
  balance: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currentMonth: PropTypes.shape({}),
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  percentage: PropTypes.number,
  title: PropTypes.string,
};
