import {
  // helpers
  ALIGN,
  COLOR,
  POINTER,
  SIZE,
  // components
  Icon,
  Text,
  Touchable,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { Box } from '../Box';
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
    marginTop: currency || icon ? SIZE.XS : undefined,
    numberOfLines: 1,
  };

  return (
    <Touchable onPress={onPress} style={others.style}>
      <Box color={selected ? colorSelected : color} pointerEvents={POINTER.NONE} style={style.container}>
        {icon && <Icon color={colorContent} name={icon} />}

        {caption && (
          <Text
            {...textProps}
            action={!currency}
            level={!currency ? 2 : undefined}
            marginTop={!currency ? SIZE.XS : undefined}
            style={currency && style.currency}
          >
            {caption}
          </Text>
        )}
        {legend && (
          <Text {...textProps} detail>
            {legend}
          </Text>
        )}
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
  currency: PropTypes.bool,
  icon: PropTypes.string,
  legend: PropTypes.string,
  selected: PropTypes.bool,
  onPress: PropTypes.func,
};

export { Option };
