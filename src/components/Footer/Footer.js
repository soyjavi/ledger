import { FontAwesome } from '@expo/vector-icons';
import { func } from 'prop-types';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { onHardwareBackPress } from '../../common';
import { useConnection } from '../../context';
import { THEME } from '../../reactor/common';
import { Button } from '../../reactor/components';
import styles from './Footer.style';

const { COLOR } = THEME;

const BUTTON = {
  color: COLOR.ACCENT, large: true, rounded: true, shadow: true, style: styles.button,
};

const Footer = ({
  onBack, onHardwareBack, onPress, ...inherit
}) => {
  const { connected } = useConnection();

  useEffect(() => {
    if (onHardwareBack) onHardwareBackPress(true, onHardwareBack);
    return () => { onHardwareBackPress(false); };
  }, [onHardwareBack]);

  return (
    <View style={[styles.container, inherit.style]}>
      { onBack && (
        <Button {...BUTTON} large={onPress === undefined} onPress={onBack} small>
          <FontAwesome name="arrow-left" color={COLOR.BASE} size={16} />
        </Button>
      )}
      { onPress && connected && (
        <Button {...BUTTON} small disabled={!connected} onPress={onPress}>
          <FontAwesome name="plus" color={COLOR.BASE} size={20} />
        </Button>
      )}
    </View>
  );
};

Footer.propTypes = {
  onBack: func,
  onHardwareBack: func,
  onPress: func,
};

Footer.defaultProps = {
  onBack: undefined,
  onHardwareBack: undefined,
  onPress: undefined,
};

export { Footer };
