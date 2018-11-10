import { bool, func } from 'prop-types';
import React from 'react';

import { Motion, Text, Touchable } from 'reactor/components';
import styles from './FloatingButton.style';

const FloatingButton = ({ onPress, visible }) => (
  <Motion preset="fade" visible={visible} style={styles.container}>
    <Touchable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>+</Text>
    </Touchable>
  </Motion>
);

FloatingButton.propTypes = {
  visible: bool,
  onPress: func.isRequired,
};

FloatingButton.defaultProps = {
  visible: false,
};

export default FloatingButton;
