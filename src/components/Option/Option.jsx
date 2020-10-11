import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Icon, Text, Touchable } from 'reactor/components';

import { Box } from '../Box';
import { CurrencyLogo } from '../CurrencyLogo';
import styles, { OPTION_SIZE } from './Option.style';

const { BORDER_RADIUS, COLOR, FONT, ICON, SPACE } = THEME;

const Option = ({ caption, currency, children, disabled, icon, image, onPress, selected, legend, ...inherit }) => {
  const colorContent = disabled ? COLOR.LIGHTEN : selected ? COLOR.BACKGROUND : COLOR.TEXT;

  return (
    <Box
      {...inherit}
      borderRadius={BORDER_RADIUS}
      color={selected ? COLOR.CTA : COLOR.BASE}
      small
      style={[styles.container, inherit.style]}
    >
      <Touchable onPress={!disabled ? onPress : undefined} rippleColor={colorContent} style={styles.content}>
        {currency && <CurrencyLogo currency={currency} highlight={selected} small />}
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
  currency: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  legend: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
};

export { Option, OPTION_SIZE };
