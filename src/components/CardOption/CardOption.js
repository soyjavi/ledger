import {
  bool, func, node, number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { Icon, Text, Touchable } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import styles from './CardOption.style';

const { COLOR } = THEME;

const CardOption = ({
  children, color, icon, image, onPress, selected, title, ...inherit
}) => (
  <Touchable
    onPress={onPress}
    style={[styles.container, selected && { backgroundColor: color }, inherit.style]}
  >
    { (image || icon) && (
      <View style={[styles.thumbnail, selected && styles.thumbnailHighlight]}>
        { image && <Image source={image} style={styles.image} /> }
        { icon && <Icon value={icon} style={styles.icon} /> }
      </View>
    )}
    <Text caption level={2} numberOfLines={1} style={[styles.title, selected && styles.titleHighlight]}>
      {title}
    </Text>
    { children }
  </Touchable>
);

CardOption.propTypes = {
  children: node,
  color: string,
  icon: oneOfType([number, string]),
  image: oneOfType([number, string]),
  onPress: func.isRequired,
  selected: bool,
  title: string.isRequired,
};

CardOption.defaultProps = {
  children: undefined,
  color: COLOR.PRIMARY,
  icon: undefined,
  image: undefined,
  selected: false,
};

export default CardOption;
