import {
  array, arrayOf, number, shape,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { C, objectToQueryString } from '../../../../common';
import { Consumer } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Image, Text } from '../../../../reactor/components';
import Heading from '../../../../components/Heading';
import styles, { MAP_HEIGHT, MAP_WIDTH } from './Locations.style';

const { ENDPOINT } = C;
const { COLOR } = THEME;

class Locations extends PureComponent {
  static propTypes = {
    cities: shape({}),
    countries: shape({}),
    points: arrayOf(array),
    precission: number,
  };

  static defaultProps = {
    cities: {},
    countries: {},
    points: [],
    precission: 0.001,
  };

  render() {
    const {
      cities, countries, points, precission,
    } = this.props;
    const query = objectToQueryString({
      color: COLOR.PRIMARY,
      points: JSON.stringify(points),
      precission,
      resolution: `${MAP_WIDTH}x${MAP_HEIGHT}@2x`,
    });

    return (
      <Consumer>
        { ({ l10n }) => (
          <View style={styles.container}>
            <Heading breakline title={l10n.LOCATIONS} />
            <View style={styles.content}>
              <Image
                resizeMode="cover"
                source={points.length > 0 ? { uri: `${ENDPOINT}/heatmap?${query}` } : undefined}
                style={styles.map}
              />
              <Text subtitle level={3}>$Cities</Text>
              <Text level={2} lighten>{JSON.stringify(cities)}</Text>
              <Text subtitle level={3}>$Countries</Text>
              <Text level={2} lighten>{JSON.stringify(countries)}</Text>
            </View>
          </View>
        )}
      </Consumer>
    );
  }
}

export default Locations;
