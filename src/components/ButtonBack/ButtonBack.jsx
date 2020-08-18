import PropTypes from 'prop-types';

import React, { useEffect } from 'react';
import { THEME } from 'reactor/common';
import { Motion } from 'reactor/components';

import { onHardwareBackPress } from '@common';

import { Option } from '../Option';
import styles from './ButtonBack.style';

const { SPACE } = THEME;

export const ButtonBack = ({ onPress, visible }) => {
  useEffect(() => {
    onHardwareBackPress(visible, onPress);
    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Motion style={styles.container} timeline={[{ property: 'translateX', value: visible ? 0 : SPACE.XXL * 2 }]}>
      <Option selected onPress={onPress} icon="arrow-left" />
    </Motion>
  );
};

ButtonBack.propTypes = {
  onPress: PropTypes.func,
  visible: PropTypes.bool,
};
