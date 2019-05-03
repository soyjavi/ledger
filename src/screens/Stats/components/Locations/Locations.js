import { shape } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Consumer } from '../../../../context';
import { Image, Text } from '../../../../reactor/components';
import Heading from '../../../../components/Heading';
import styles from './Locations.style';

class Locations extends PureComponent {
  static propTypes = {
    dataSource: shape({}),
  };

  static defaultProps = {
    dataSource: {},
  };

  render() {
    const { props: { dataSource = {} } } = this;

    return (
      <Consumer>
        { ({ l10n }) => (
          <View style={styles.container}>
            <Heading breakline title={l10n.LOCATIONS} />
            <View style={styles.content}>
              <Image resizeMode="cover" source={{ uri: dataSource.map }} style={styles.map} />
            </View>
          </View>
        )}
      </Consumer>
    );
  }
}

export default Locations;
