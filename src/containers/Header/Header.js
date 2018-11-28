import { bool, shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Button, Text } from '../../reactor/components';
import styles from './Header.style';

const { COLOR } = THEME;

const Header = ({
  highlight, left = {}, onBack, right = {}, visible, title, ...inherit
}) => (
  <View style={[styles.container, inherit.style]}>
    <Button color={COLOR.TRANSPARENT} rippleColor={COLOR.PRIMARY} {...left} iconSize={24} />
    <Text headline level={5} color={highlight ? COLOR.WHITE : undefined} numberOfLines={1} style={styles.title}>
      { title }
    </Text>
    <Button color={COLOR.TRANSPARENT} rippleColor={COLOR.PRIMARY} {...right} iconSize={24} />
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
