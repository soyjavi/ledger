import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { Icon, Text, Touchable } from 'reactor/components';
import { THEME } from 'reactor/common';

import { Box } from '../Box';
import styles, { OPTION_SIZE } from './Option.style';

const { BORDER_RADIUS, COLOR, SPACE } = THEME;

export { OPTION_SIZE };

export const Option = ({
  caption,
  children,
  color = COLOR.BASE,
  disabled,
  icon,
  image,
  onPress,
  selected,
  legend,
  ...inherit
}) => {
  const colorContent = disabled ? COLOR.LIGHTEN : selected ? COLOR.BACKGROUND : COLOR.TEXT;

  return (
    <Box
      {...inherit}
      elevate={disabled ? false : inherit.elevate}
      borderRadius={BORDER_RADIUS}
      color={selected ? COLOR.CTA : color}
      small
      style={[styles.container, inherit.style]}
    >
      <Touchable onPress={!disabled ? onPress : undefined} rippleColor={colorContent} style={styles.content}>
        {icon && <Icon value={icon} color={colorContent} family={inherit.family || 'SimpleLineIcons'} size={SPACE.L} />}
        {image && <Image source={image} style={styles.image} />}

        {caption && (
          <Text
            align="center"
            caption
            color={colorContent}
            marginTop={icon || image ? 'XS' : undefined}
            numberOfLines={1}
          >
            {caption}
          </Text>
        )}
        {legend && (
          <Text
            align="center"
            color={colorContent}
            marginTop={icon || image ? 'XS' : undefined}
            numberOfLines={1}
            style={styles.legend}
          >
            {legend}
          </Text>
        )}
        {children}
      </Touchable>
    </Box>
  );
};

Option.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  legend: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};
