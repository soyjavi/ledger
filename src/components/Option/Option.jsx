import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Icon, Text, Touchable } from 'reactor/components';

import { Box } from '../Box';
import { CurrencyLogo } from '../CurrencyLogo';
import styles, { OPTION_SIZE } from './Option.style';

const { BORDER_RADIUS, COLOR, FONT, ICON, SPACE } = THEME;

const Option = ({
  caption,
  children,
  color = COLOR.BASE,
  currency,
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
      borderRadius={BORDER_RADIUS}
      color={selected ? COLOR.CTA : color}
      small
      style={[styles.container, inherit.style]}
    >
      <Touchable onPress={!disabled ? onPress : undefined} style={styles.content}>
        {currency && (
          <CurrencyLogo color={selected ? COLOR.BRAND : COLOR.TEXT} currency={currency} highlight={selected} small />
        )}
        {icon && <Icon value={icon} color={colorContent} family={ICON.FAMILY} size={SPACE.L} />}

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
            style={FONT.LEGEND}
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
  currency: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  legend: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};

export { Option, OPTION_SIZE };
