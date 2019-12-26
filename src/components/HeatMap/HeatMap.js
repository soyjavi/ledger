import {
  array, arrayOf, number, string,
} from 'prop-types';
import React from 'react';

import { C, objectToQueryString } from '../../common';
import { THEME } from '../../reactor/common';
import { Image } from '../../reactor/components';
import styles, { MAP_HEIGHT, MAP_WIDTH } from './HeatMap.style';

const { ENDPOINT } = C;
const { COLOR } = THEME;

const HeatMap = ({
  color, height, points, precission, width, ...inherit
}) => {
  const queryString = points
    ? objectToQueryString({
      color,
      points: JSON.stringify(points),
      precission,
      resolution: `${width}x${height}@2x`,
    })
    : undefined;

  return (
    <Image
      resizeMode="cover"
      source={queryString
        ? { uri: `${ENDPOINT}/heatmap?${queryString}&style=dark` }
        : undefined}
      style={[styles.container, inherit.style]}
    />
  );
};

HeatMap.propTypes = {
  color: string,
  height: number,
  width: number,
  points: arrayOf(array),
  precission: number,
};

HeatMap.defaultProps = {
  color: COLOR.PRIMARY,
  height: MAP_HEIGHT,
  points: undefined,
  precission: 0.001,
  width: MAP_WIDTH,
};

export { HeatMap };
