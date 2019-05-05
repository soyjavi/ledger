import {
  array, arrayOf, number, shape,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Consumer } from '../../../../context';
import { Image, Text } from '../../../../reactor/components';
import Heading from '../../../../components/Heading';
import styles from './Locations.style';

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

  constructor(props) {
    super(props);
    this.state = { map: undefined };
    this.getHeatmap(props);
  }

  async componentWillReceiveProps(nextProps) {
    this.getHeatmap(nextProps);
  }

  getHeatmap = async ({ points, precission, ...inherit }) => {
    const { map } = await inherit.getLocations({ points: JSON.stringify(points), precission });
    this.setState({ map });
  }

  render() {
    const { props: { cities, countries }, state: { map } } = this;

    return (
      <Consumer>
        { ({ l10n }) => (
          <View style={styles.container}>
            <Heading breakline title={l10n.LOCATIONS} />
            <View style={styles.content}>
              <Image resizeMode="cover" source={{ uri: map }} style={styles.map} />
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
