import { bool, func, node, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

import { Icon, Text, Touchable } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import { Box } from '../Box';
import styles from './Option.style';

const { BORDER_RADIUS, COLOR, SPACE } = THEME;

const Option = ({ children, color = COLOR.BASE, icon, image, onPress, selected, title, ...inherit }) => {
  const colorContent = selected ? COLOR.BACKGROUND : COLOR.TEXT;
  const onlyText = !icon && !image;

  return (
    <Box
      borderRadius={BORDER_RADIUS}
      color={selected ? COLOR.CTA : color}
      elevate={inherit.elevate || selected}
      marginRight={inherit.marginRight || 'S'}
      small
      style={[styles.container, inherit.style]}
    >
      <Touchable onPress={onPress} rippleColor={COLOR.TEXT} style={[styles.content]}>
        {icon && <Icon value={icon} color={colorContent} size={SPACE.L} />}
        {image && <Image source={image} style={styles.image} />}

        <Text
          align="center"
          // caption={onlyText}
          caption
          color={colorContent}
          marginTop={!onlyText ? 'S' : undefined}
          numberOfLines={1}
          // style={!onlyText ? styles.legend : undefined}
        >
          {title}
        </Text>
        {children}
      </Touchable>
    </Box>
  );
};

Option.propTypes = {
  children: node,
  color: string,
  icon: oneOfType([number, string]),
  image: oneOfType([number, string]),
  onPress: func.isRequired,
  selected: bool,
  title: string.isRequired,
};

export { Option };