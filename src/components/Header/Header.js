import {
  bool, number, oneOfType, shape, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { Button, Motion } from '../../reactor/components';
import Heading from '../Heading';
import styles from './Header.style';

const Header = ({
  highlight, image, right, title, ...inherit
}) => (
  <View style={[styles.row, styles.container, inherit.style]}>
    <View style={styles.content}>
      { title && (
        <Motion timeline={[{ property: 'opacity', value: highlight ? 1 : 0 }]} style={styles.row}>
          <Heading title={title} image={image} />
        </Motion>
      )}
    </View>
    { right && <Button contained={false} small {...right} style={styles.button} /> }
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
