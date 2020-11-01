import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Col, Image, Text } from 'reactor/components';

import { useConnection } from '@context';
import { ServiceLocation } from '@services';

import styles, { MAP_HEIGHT, MAP_WIDTH } from './HeatMap.style';

const { COLOR } = THEME;

const HeatMap = ({ caption, color = COLOR.BRAND, darkMode = false, points, precission = 0.001, small, ...inherit }) => {
  const { online } = useConnection();

  return (
    <Col>
      <Image
        resizeMode="cover"
        source={{
          uri:
            online && points
              ? ServiceLocation.uriMap({
                  color,
                  darkMode,
                  height: MAP_HEIGHT,
                  points,
                  precission,
                  small,
                  width: MAP_WIDTH,
                })
              : undefined,
        }}
        style={[styles.container, small && styles.small, inherit.style]}
      />
      {caption && (
        <Text caption color={COLOR.LIGHTEN} marginTop="XS">
          {caption}
        </Text>
      )}
    </Col>
  );
};

HeatMap.propTypes = {
  caption: PropTypes.string,
  color: PropTypes.string,
  darkMode: PropTypes.bool,
  points: PropTypes.arrayOf(PropTypes.array),
  precission: PropTypes.number,
  small: PropTypes.bool,
};

export { HeatMap };
