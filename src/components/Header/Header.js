import {
  bool, number, oneOfType, shape, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { Motion } from '../../reactor/components';

import ASSETS from '../../assets';
import ButtonMore from '../ButtonMore';
import Heading from '../Heading';
import styles from './Header.style';

const Header = ({
  highlight, image, right, title,
}) => (
  <View style={[styles.container, styles.row]}>
    <Motion timeline={[{ property: 'opacity', value: highlight ? 1 : 0 }]} style={styles.content}>
      { title && <Heading title={title} image={image} /> }
    </Motion>
    { right && <ButtonMore {...right} /> }
  </View>
);

Header.propTypes = {
  image: oneOfType([number, string]),
  highlight: bool,
  right: shape({}),
  title: string,
};

Header.defaultProps = {
  image: ASSETS.logo,
  highlight: false,
  right: undefined,
  title: undefined,
};

export default Header;
