import {
  bool, func, number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

import { Text, Touchable } from '../../reactor/components';

import styles from './CardOption.style';

const CardOption = ({
  image, onPress, selected, title,
}) => (
  <Touchable
    onPress={onPress}
    style={[styles.container, selected && styles.selected]}
  >
    <Image source={image} style={styles.image} />
    <Text caption level={2} style={[styles.title, selected && styles.titleHighlight]}>
      {title}
    </Text>
  </Touchable>
);

CardOption.propTypes = {
  image: oneOfType([number, string]),
  onPress: func.isRequired,
  selected: bool,
  title: string.isRequired,
};

CardOption.defaultProps = {
  image: undefined,
  selected: false,
};

export default CardOption;
