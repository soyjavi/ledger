import { bool, shape, string } from 'prop-types';
import React from 'react';

import { THEME } from '../../reactor/common';
import { Button, Motion, Text } from '../../reactor/components';
import styles from './Header.style';

const { COLOR, MOTION: { DURATION } } = THEME;
const PRESET = 'fadeleft';

const Header = ({
  highlight, left = {}, onBack, right = {}, visible, title, ...inherit
}) => (
  <Motion preset={PRESET} delay={DURATION} visible={visible} style={[styles.container, inherit.style]}>
    <Button color={COLOR.TRANSPARENT} rippleColor={COLOR.PRIMARY} {...left} />
    <Text headline level={5} color={highlight ? COLOR.WHITE : undefined} numberOfLines={1} style={styles.title}>
      { title }
    </Text>
    <Button color={COLOR.TRANSPARENT} rippleColor={COLOR.PRIMARY} {...right} />
  </Motion>
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
