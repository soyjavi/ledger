import { array, arrayOf, bool, number, string } from 'prop-types';
import React from 'react';

import { C, objectToQueryString } from '../../common';
import { THEME } from '../../reactor/common';
import { Col, Image, Text } from '../../reactor/components';
import styles, { MAP_HEIGHT, MAP_WIDTH } from './HeatMap.style';

const { ENDPOINT } = C;
const { COLOR } = THEME;

export const HeatMap = ({ caption, color = COLOR.BRAND, darkMode = true, points, precission = 0.001, ...inherit }) => {
  const queryString = points
    ? objectToQueryString({
        color,
        points: JSON.stringify(points),
        precission,
        resolution: `${MAP_WIDTH}x${MAP_HEIGHT}@2x`,
      })
    : undefined;

  return (
    <Col>
      <Image
        resizeMode="cover"
        source={
          queryString ? { uri: `${ENDPOINT}/heatmap?${queryString}&style=${darkMode ? 'dark' : 'light'}` } : undefined
        }
        style={[styles.container, inherit.style]}
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
  caption: string,
  color: string,
  darkMode: bool,
  points: arrayOf(array),
  precission: number,
};
