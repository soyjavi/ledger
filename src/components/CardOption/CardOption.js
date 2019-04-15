import {
  bool, func, number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { Icon, Text, Touchable } from '../../reactor/components';

import styles from './CardOption.style';

const CardOption = ({
  icon, image, onPress, selected, title, ...inherit
}) => (
  <Touchable
    onPress={onPress}
    style={[styles.container, selected && styles.selected, inherit.style]}
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
  icon: oneOfType([number, string]),
  image: oneOfType([number, string]),
  onPress: func.isRequired,
  selected: bool,
  title: string.isRequired,
};

CardOption.defaultProps = {
  icon: undefined,
  image: undefined,
  selected: false,
};

export default CardOption;
