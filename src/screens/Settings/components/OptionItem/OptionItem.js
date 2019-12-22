import { FontAwesome } from '@expo/vector-icons';
import {
  bool, func, node, string,
} from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { THEME } from '../../../../reactor/common';
import { Text, Touchable } from '../../../../reactor/components';

import { Box } from '../../../../components';
import styles from './OptionItem.style';

const { COLOR } = THEME;

const OptionItem = ({
  active, caption, children, onChange, onPress, title, color, image
}) => (
  <View style={styles.container}>
    <Box small color={(active ? color : undefined)}>
      <Image source={image} style={[styles.image, !active && styles.imageDisabled]} />
    </Box>
    <Touchable onPress={onPress} rippleColor={COLOR.PRIMARY} style={styles.content}>
      <Text bold numberOfLines={1} lighten={!active}>{title}</Text>
      { caption && <Text bold caption lighten>{caption}</Text> }
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
  onChange: func.isRequired,
  onPress: func,
  title: string.isRequired,
};

OptionItem.defaultProps = {
  active: true,
  caption: undefined,
  children: undefined,
  onPress: undefined,
};

export default OptionItem;
