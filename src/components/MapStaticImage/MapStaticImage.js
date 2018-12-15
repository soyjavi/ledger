import { number } from 'prop-types';
import React, { PureComponent } from 'react';

import { C } from '../../common';
import { Image } from '../../reactor/components';
import styles from './MapStaticImage.style';

const { ENDPOINT } = C;

class Map extends PureComponent {
  static propTypes = {
    latitude: number.isRequired,
    longitude: number.isRequired,
    zoom: number,
  };

  static defaultProps = {
    zoom: 14,
  };

  render() {
    const {
      props: { latitude, longitude, zoom },
    } = this;

    return (
      <Image
        source={{ uri: `${ENDPOINT}/staticmap?latitude=${latitude}&longitude=${longitude}&zoom=${zoom}` }}
        resizeMode="cover"
        style={styles.container}
      />
    );
  }
}

export default Map;
