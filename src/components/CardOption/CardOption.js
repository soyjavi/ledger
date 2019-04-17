import {
  bool, func, number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { Icon, Text, Touchable } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import styles from './CardOption.style';

const { COLOR } = THEME;

const CardOption = ({
  color, icon, image, onPress, selected, title, ...inherit
}) => (
  <Touchable
    onPress={onPress}
    style={[styles.container, selected && { backgroundColor: color }, inherit.style]}
  >
    <View style={[styles.thumbnail, selected && styles.thumbnailHighlight]}>
      { image && <Image source={image} style={styles.image} /> }
      { icon && <Icon value={icon} style={styles.icon} /> }
    </View>
    <Text caption level={2} style={[styles.title, selected && styles.titleHighlight]}>
      {title}
    </Text>
  </Touchable>
);

CardOption.propTypes = {
  color: string,
  icon: oneOfType([number, string]),
  image: oneOfType([number, string]),
  onPress: func.isRequired,
  selected: bool,
  title: string.isRequired,
};

CardOption.defaultProps = {
  color: COLOR.PRIMARY,
  icon: undefined,
  image: undefined,
  selected: false,
};

export default CardOption;
