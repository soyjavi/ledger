import {
  // helpers
  ALIGN,
  COLOR,
  SIZE,
  // components
  Icon,
  Text,
  Touchable,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { Box } from '../Box';
import { CurrencyLogo } from '../CurrencyLogo';
import { style } from './Option.style';

const Option = ({
  caption,
  children,
  color = COLOR.INFO,
  colorSelected = COLOR.CONTENT,
  currency,
  icon,
  legend,
  selected,
  onPress,
  ...others
}) => {
  const colorContent = selected ? COLOR.BASE : COLOR.GRAYSCALE_M;

  const textProps = {
    align: ALIGN.CENTER,
    color: colorContent,
    detail: true,
    marginTop: icon ? SIZE.XS : undefined,
    numberOfLines: 1,
  };

  return (
    <Touchable onPress={onPress} style={others.style}>
      <Box color={selected ? colorSelected : color} style={style.container}>
        {currency && <CurrencyLogo color={selected ? COLOR.BASE : COLOR.CONTENT} currency={currency} />}
        {icon && <Icon color={colorContent} name={icon} />}

        {caption && (
          <Text {...textProps} level={2} marginTop={SIZE.XS}>
            {caption}
          </Text>
        )}
        {legend && <Text {...textProps}>{legend}</Text>}
        {children}
      </Box>
    </Touchable>
  );
};

Option.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  colorSelected: PropTypes.string,
  currency: PropTypes.string,
  icon: PropTypes.string,
  legend: PropTypes.string,
  selected: PropTypes.bool,
  onPress: PropTypes.func,
};

export { Option };
