import {
  bool, node, number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Motion } from '../../reactor/components';

import { LOGO } from '../../assets';
import Heading from '../Heading';
import styles from './Header.style';

const Header = ({
  children, highlight, image, title,
}) => (
  <View style={styles.container}>
    <Motion timeline={[{ property: 'opacity', value: highlight ? 1 : 0 }]} style={styles.content}>
      { title && <Heading title={title} image={image} /> }
    </Motion>
    <View>{children}</View>
  </View>
);

Header.propTypes = {
  children: node,
  highlight: bool,
  image: oneOfType([number, string]),
  title: string,
};

Header.defaultProps = {
  children: undefined,
  highlight: false,
  image: LOGO,
  title: undefined,
};

export { Header };
