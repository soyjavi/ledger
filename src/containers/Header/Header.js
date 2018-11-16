import { bool, shape, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';
import {
  Icon, Motion, ProgressBar, Text, Touchable,
} from '../../reactor/components';
import styles from './Header.style';

const { RESPONSE_TIME } = C;
const { COLOR, MOTION: { DURATION } } = THEME;
const PRESET = 'fadeleft';

const Option = ({
  delay, icon, onPress, visible, ...inherit
}) => (
  <Motion preset={PRESET} delay={delay} visible={visible}>
    <Touchable onPress={onPress} rippleColor={COLOR.BASE} style={[styles.option, inherit.style]}>
      { icon && <Icon value={icon} style={styles.icon} /> }
    </Touchable>
  </Motion>
);

const Header = ({
  busy, highlight, left = {}, onBack, right = {}, visible, title, ...inherit
}) => {
  const color = highlight ? COLOR.WHITE : undefined;

  return (
    <View style={[styles.container, inherit.style]}>
      { busy && <ProgressBar duration={RESPONSE_TIME} progress={busy ? 1 : 0} style={styles.progressBar} /> }
      <Option {...left} color={color} delay={DURATION} visible={visible} />
      <Motion preset={PRESET} delay={DURATION * 1.5} visible={visible} style={styles.content}>
        <Text headline level={5} color={color} numberOfLines={1} style={styles.title}>
          { title }
        </Text>
      </Motion>
      <Option {...right} color={color} delay={DURATION * 2} visible={visible} />
    </View>
  );
};

Header.propTypes = {
  busy: bool,
  highlight: bool,
  left: shape({}),
  right: shape({}),
  title: string,
  visible: bool,
};

Header.defaultProps = {
  busy: false,
  highlight: false,
  left: undefined,
  right: undefined,
  title: undefined,
  visible: false,
};

export default Header;
