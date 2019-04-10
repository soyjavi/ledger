import { bool, shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Button, Motion } from '../../reactor/components';
import Heading from '../Heading';
import styles from './Header.style';

const { COLOR } = THEME;

const Header = ({
  highlight, left, right, title, visible, ...inherit
}) => (
  <View style={[styles.row, styles.container, highlight && styles.highlight, inherit.style]}>
    { left && <Button color={COLOR.TRANSPARENT} {...left} iconSize={24} /> }
    <View style={styles.content}>
      { title && (
        <Motion preset="fade" style={styles.row} visible={highlight}>
          <Heading title={title} logo />
        </Motion>
      )}
    </View>
    { right && <Button contained={false} small {...right} /> }
  </View>
);

Header.propTypes = {
  highlight: bool,
  left: shape({}),
  right: shape({}),
  title: string,
  visible: bool,
};

Header.defaultProps = {
  highlight: false,
  left: undefined,
  right: undefined,
  title: undefined,
  visible: false,
};

export default Header;
