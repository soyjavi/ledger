import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Col, Image, Text } from 'reactor/components';

import { C, objectToQueryString } from '@common';
import { useConnection } from '@context';

import styles, { MAP_HEIGHT, MAP_WIDTH } from './HeatMap.style';

const { ENDPOINT } = C;
const { COLOR } = THEME;

export const HeatMap = ({
  caption,
  color = COLOR.BRAND,
  darkMode = false,
  points,
  precission = 0.001,
  small,
  ...inherit
}) => {
  const { connected } = useConnection();

  const queryString =
    connected && points
      ? objectToQueryString({
          color,
          points: JSON.stringify(points),
          precission,
          resolution: `${MAP_WIDTH}x${small ? MAP_HEIGHT / 2 : MAP_HEIGHT}@2x`,
        })
      : undefined;

  return (
    <Col>
      <Image
        resizeMode="cover"
        source={
          queryString ? { uri: `${ENDPOINT}/map?${queryString}&style=${darkMode ? 'dark' : 'light'}` } : undefined
        }
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
