import PropTypes from 'prop-types';

import React from 'react';
import { Image, View } from 'react-native';
import { THEME } from 'reactor/common';
import { Row, Text, Touchable } from 'reactor/components';

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
  const {
    settings: { baseCurrency },
    rates,
  } = useStore();

  return (
    <Touchable {...others} onPress={onPress} rippleColor={COLOR.LIGHTEN} style={styles.container}>
      <Box outlined={disabled} style={styles.box}>
        <View style={styles.content}>
          <Row marginBottom="XS">
            <Image source={FLAGS[currency]} style={styles.flag} />
            <Text caption numberOfLines={1} marginLeft="XS">
              {title.toUpperCase()}
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
            <PriceFriendly
              bold={others.bold}
              caption
              color={others.color}
              currency="%"
              highlight={others.highlight}
              operator={others.operator}
              value={percentage}
            />
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
