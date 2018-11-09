import {
  bool, func, shape, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { C } from 'common';
import { Consumer } from 'context';
import { THEME } from 'reactor/common';
import {
  Motion, ProgressBar, Text, Touchable,
} from 'reactor/components';
import styles from './Header.style';

const { RESPONSE_TIME } = C;
const { COLOR, MOTION: { DURATION } } = THEME;
const PRESET = 'fadeleft';

const Option = ({
  delay, title, onPress, visible, ...inherit
}) => (
  <Motion preset={PRESET} delay={delay} visible={visible}>
    <Touchable onPress={onPress} rippleColor="rgba(">
      <Text level={2} lighten {...inherit} style={[styles.option, inherit.style]}>
        {title}
      </Text>
    </Touchable>
  </Motion>
);

const Header = ({
  busy, highlight, left = {}, onBack, right = {}, visible, title, ...inherit
}) => {
  const color = highlight ? COLOR.WHITE : undefined;

  return (
    <Consumer>
      { ({ l10n = {} }) => (
        <View style={[styles.container, inherit.style]}>
          { busy && <ProgressBar duration={RESPONSE_TIME} progress={busy ? 1 : 0} style={styles.progressBar} /> }
          <Option
            title={onBack ? l10n.BACK : left.title}
            onPress={onBack || left.onPress}
            style={styles.optionLeft}
            color={color}
            delay={DURATION}
            visible={visible}
          />
          <Motion preset={PRESET} delay={DURATION * 1.5} visible={visible} style={styles.title}>
            <Text headline level={5} color={color} numberOfLines={1}>
              { title }
            </Text>
          </Motion>
          <Option {...right} style={styles.optionRight} color={color} delay={DURATION * 2} visible={visible} />
        </View>
      )}
    </Consumer>
  );
};

Header.propTypes = {
  busy: bool,
  highlight: bool,
  left: shape({}),
  onBack: func,
  right: shape({}),
  title: string,
  visible: bool,
};

Header.defaultProps = {
  busy: false,
  highlight: false,
  left: undefined,
  onBack: undefined,
  right: undefined,
  title: undefined,
  visible: false,
};

export default Header;
