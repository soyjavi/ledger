import { FontAwesome } from '@expo/vector-icons';
import React, { Fragment } from 'react';
import { Image, View, ImageSourcePropType } from 'react-native';

import { FLAGS } from '../../../../assets';
import { THEME } from '../../../../reactor/common';
import { Text, Touchable } from '../../../../reactor/components';

import { exchange } from '../../../../common';
import { Box, PriceFriendly } from '../../../../components';
import { useStore } from '../../../../context';
import styles from './VaultItem.style';

const { COLOR } = THEME;

interface VaultProps {
  currency: String,
  currentBalance: Number,
  title: String,
};

interface OptionItemProps {
  active: Boolean,
  dataSource: VaultProps,
  onChange: Function,
  onPress: Function,
};

const OptionItem: React.FC<OptionItemProps> = ({
  active, children, onChange, onPress, dataSource: { currency, currentBalance, title }
}) => {
  const { baseCurrency, rates } = useStore();
  const disabled = !active;

  return (
    <View style={styles.container}>
      <Box small color={(active ? COLOR[currency] : undefined)}>
        <Image source={FLAGS[currency]} style={[styles.image, disabled && styles.imageDisabled]} />
      </Box>
      <Touchable onPress={onPress} rippleColor={COLOR.PRIMARY} style={styles.content}>
        <Text bold numberOfLines={1} lighten={disabled}>{title}</Text>
        <View style={styles.row}>
          <PriceFriendly
            caption
            lighten={disabled}
            currency={baseCurrency}
            value={currency !== baseCurrency
              ? exchange(currentBalance, currency, baseCurrency, rates)
              : currentBalance
            }
            style={styles.balance}
          />
          { currency !== baseCurrency && (
            <Fragment>
              <Text caption lighten>(</Text>
              <PriceFriendly caption lighten currency={currency} value={currentBalance} />
              <Text caption lighten>)</Text>
            </Fragment>
            )}
        </View>
      </Touchable>
      <Touchable onPress={() => onChange(!active)} rippleColor={COLOR.ACCENT}>
        <View style={[styles.iconContainer, active && styles.iconActive]}>
          { active && <FontAwesome name="check" color={COLOR.BACKGROUND} size={16} /> }
        </View>
      </Touchable>
    </View>
  );
};

export default OptionItem;
