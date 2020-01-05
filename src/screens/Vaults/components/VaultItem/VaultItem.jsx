import { bool, shape, func } from 'prop-types';
import React, { Fragment } from 'react';
import { Image, View } from 'react-native';

import { FLAGS } from '../../../../assets';
import { THEME } from '../../../../reactor/common';
import { InputOption, Text, Touchable } from '../../../../reactor/components';

import { exchange } from '../../../../common';
import { Box, PriceFriendly } from '../../../../components';
import { useStore } from '../../../../context';
import styles from './VaultItem.style';

const { COLOR } = THEME;

const OptionItem = ({ active, onChange, onPress, dataSource: { currency, currentBalance, title } }) => {
  const { baseCurrency, rates } = useStore();
  const disabled = !active;

  return (
    <View style={styles.container}>
      <Box small color={active ? COLOR[currency] : undefined}>
        <Image source={FLAGS[currency]} style={[styles.image, disabled && styles.imageDisabled]} />
      </Box>
      <Touchable onPress={onPress} rippleColor={COLOR.PRIMARY} style={styles.content}>
        <Text bold numberOfLines={1} lighten={disabled}>
          {title}
        </Text>
        <View style={styles.row}>
          <PriceFriendly
            caption
            lighten={disabled}
            currency={baseCurrency}
            value={currency !== baseCurrency ? exchange(currentBalance, currency, baseCurrency, rates) : currentBalance}
            style={styles.balance}
          />
          {currency !== baseCurrency && (
            <Fragment>
              <Text caption lighten>
                (
              </Text>
              <PriceFriendly caption lighten currency={currency} value={currentBalance} />
              <Text caption lighten>
                )
              </Text>
            </Fragment>
          )}
        </View>
      </Touchable>
      <InputOption onChange={() => onChange(!active)} value={active} size={24} style={styles.inputOption} />
    </View>
  );
};

OptionItem.propTypes = {
  active: bool,
  dataSource: shape({}).isRequired,
  onChange: func.isRequired,
  onPress: func.isRequired,
};

OptionItem.defaultProps = {
  active: false,
};

export default OptionItem;
