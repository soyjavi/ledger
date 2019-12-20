import { FontAwesome } from '@expo/vector-icons';
import {
  bool, func, node, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Text, Touchable } from '../../reactor/components';

import styles from './OptionItem.style';

const { COLOR } = THEME;

const OptionItem = ({
  active, caption, children, disabled, onChange, onPress, title,
}) => (
  <View style={styles.container}>
    <Touchable onPress={onPress} rippleColor={COLOR.PRIMARY} style={styles.content}>
      <Text subtitle numberOfLines={1} lighten={disabled}>{title}</Text>
      { caption && <Text caption lighten>{caption}</Text> }
      { children }
    </Touchable>
    <Touchable onPress={() => onChange(!active)} rippleColor={COLOR.ACCENT}>
      <View style={[styles.iconContainer, active && styles.iconActive]}>
        { active && <FontAwesome name="check" color={COLOR.BACKGROUND} size={16} /> }
      </View>
    </Touchable>
  </View>
);

OptionItem.propTypes = {
  active: bool,
  caption: string,
  children: node,
  disabled: bool,
  onChange: func.isRequired,
  onPress: func,
  title: string.isRequired,
};

OptionItem.defaultProps = {
  active: true,
  caption: undefined,
  children: undefined,
  disabled: false,
  onPress: undefined,
};

export default OptionItem;
