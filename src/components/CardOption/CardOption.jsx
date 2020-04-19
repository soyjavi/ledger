import { bool, func, node, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

import { Icon, Text, Touchable } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import { Box } from '../Box';
import styles from './CardOption.style';

const { BORDER_RADIUS, COLOR, OPACITY, SPACE } = THEME;

const CardOption = ({ children, color, icon, image, onPress, selected, title, ...inherit }) => {
  const colorContent = selected ? color : COLOR.LIGHTEN;
  const onlyText = !icon && !image;

  return (
    <Box
      borderRadius={BORDER_RADIUS}
      color={selected ? color : COLOR.BASE}
      marginRight="S"
      outlined={!selected}
      opacity={selected ? OPACITY.S : undefined}
      small
      style={[styles.box, inherit.style]}
    >
      <Touchable onPress={onPress} rippleColor={COLOR.TEXT} style={styles.container}>
        {icon && <Icon value={icon} color={colorContent} size={SPACE.L} />}
        {image && <Image source={image} style={styles.image} />}

        <Text
          align="center"
          caption={onlyText}
          color={colorContent}
          marginTop={!onlyText ? 'S' : undefined}
          numberOfLines={1}
          style={!onlyText ? styles.legend : undefined}
        >
          {title}
        </Text>
        {children}
      </Touchable>
    </Box>
  );
};

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
  color: COLOR.TEXT,
  icon: undefined,
  image: undefined,
  selected: false,
};

export { CardOption };
