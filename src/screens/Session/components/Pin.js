import { string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Motion } from 'reactor/components';

import styles from './Pin.style';

const Pin = ({ value }) => (
  <View style={styles.container}>
    <Motion style={styles.code} timeline={[{ property: 'opacity', value: value.length >= 1 ? 1 : 0.5 }]} />
    <Motion style={styles.code} timeline={[{ property: 'opacity', value: value.length >= 2 ? 1 : 0.5 }]} />
    <Motion style={styles.code} timeline={[{ property: 'opacity', value: value.length >= 3 ? 1 : 0.5 }]} />
    <Motion style={styles.code} timeline={[{ property: 'opacity', value: value.length >= 4 ? 1 : 0.5 }]} />
  </View>
);

Pin.propTypes = {
  value: string.isRequired,
};

export default Pin;
