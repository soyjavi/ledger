import { number, string } from 'prop-types';
import React, { PureComponent } from 'react';

import { C, objectToQueryString } from '../../common';
import { THEME } from '../../reactor/common';
import { Image } from '../../reactor/components';
import styles, { MAP_HEIGHT, MAP_WIDTH } from './MapStaticImage.style';

const { ENDPOINT } = C;
const { COLOR } = THEME;

class MapStaticImage extends PureComponent {
  static propTypes = {
    color: string,
    latitude: number,
    longitude: number,
  };

  static defaultProps = {
    color: COLOR.PRIMARY,
    latitude: 0,
    longitude: 0,
  };

  render() {
    const {
      color, latitude, longitude, ...inherit
    } = this.props;

    const queryString = latitude && longitude
      ? objectToQueryString({
        color,
        points: JSON.stringify([[longitude, latitude]]),
        resolution: `${MAP_WIDTH}x${MAP_HEIGHT}@2x`,
      })
      : undefined;

    return (
      <Image
        resizeMode="cover"
        source={queryString
          ? { uri: `${ENDPOINT}/heatmap?${queryString}` }
          : undefined}
        style={[styles.container, inherit.style]}
      />
    );
  }
}

export default MapStaticImage;
