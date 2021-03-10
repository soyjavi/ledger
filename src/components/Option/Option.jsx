import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Icon, Text, Touchable } from 'reactor/components';

import { Box } from '../Box';
import { CurrencyLogo } from '../CurrencyLogo';
import styles, { OPTION_SIZE } from './Option.style';

const { BORDER_RADIUS, COLOR, ICON, SPACE } = THEME;

const Option = ({
  caption,
  children,
  color = COLOR.BASE,
  colorSelected = COLOR.CTA,
  currency,
  icon,
  image,
  legend,
  selected,
  onPress,
  ...inherit
}) => {
  const colorContent = selected ? COLOR.BACKGROUND : COLOR.TEXT;

  return (
    <Box
      {...inherit}
      borderRadius={BORDER_RADIUS}
      color={selected ? colorSelected : color}
      small
      style={[styles.container, inherit.style]}
    >
      <Touchable onPress={onPress} style={styles.content}>
        {currency && <CurrencyLogo color={COLOR.LIGHTEN} currency={currency} highlight={selected} small />}
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
  colorSelected: PropTypes.string,
  currency: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  legend: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};

export { Option, OPTION_SIZE };
