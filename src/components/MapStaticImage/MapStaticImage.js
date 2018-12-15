import { number } from 'prop-types';
import React, { PureComponent } from 'react';
import { Image } from 'react-native';

import { C } from '../../common';
import styles from './MapStaticImage.style';

const { MAPBOX_ACCESS_TOKEN } = C;
const MAPBOX_URL = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/static';

class Map extends PureComponent {
  static propTypes = {
    latitude: number.isRequired,
    longitude: number.isRequired,
    zoom: number,
  };

  static defaultProps = {
    zoom: 13,
  };

  render() {
    const {
      props: { latitude, longitude, zoom },
    } = this;

    return (
      <Image
        source={{
          uri: `${MAPBOX_URL}/${latitude},${longitude},${zoom},0,0/480x128@2x?access_token=${MAPBOX_ACCESS_TOKEN}`,
        }}
        resizeMode="cover"
        style={styles.container}
      />
    );
  }
}

export default Map;
