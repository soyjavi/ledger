import { number } from 'prop-types';
import React, { PureComponent } from 'react';

import { C } from '../../common';
import { Image } from '../../reactor/components';
import styles from './MapStaticImage.style';

const { ENDPOINT } = C;

class Map extends PureComponent {
  static propTypes = {
    latitude: number,
    longitude: number,
    zoom: number,
  };

  static defaultProps = {
    latitude: undefined,
    longitude: undefined,
    zoom: 14,
  };

  render() {
    const {
      props: {
        latitude, longitude, zoom, ...inherit
      },
    } = this;

    return (
      <Image
        source={latitude && longitude
          ? { uri: `${ENDPOINT}/staticmap?latitude=${latitude}&longitude=${longitude}&zoom=${zoom}` }
          : undefined}
        resizeMode="cover"
        style={[styles.container, inherit.style]}
      />
    );
  }
}

export default Map;
