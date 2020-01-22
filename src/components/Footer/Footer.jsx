import { func } from 'prop-types';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { onHardwareBackPress } from '../../common';
import { useConnection } from '../../context';
import { THEME } from '../../reactor/common';
import { Button, Icon } from '../../reactor/components';
import styles from './Footer.style';

const { COLOR } = THEME;
const BUTTON = {
  color: COLOR.PRIMARY,
  large: true,
  small: true,
  shadow: true,
  style: styles.button,
};

const Footer = ({ onBack, onHardwareBack, onPress, ...inherit }) => {
  const { connected } = useConnection();

  useEffect(() => {
    if (onHardwareBack) onHardwareBackPress(true, onHardwareBack);
    return () => {
      onHardwareBackPress(false);
    };
  }, [onHardwareBack]);

  return (
    <View style={[styles.container, inherit.style]}>
      {onBack && (
        <Button {...BUTTON} color={onPress ? COLOR.TEXT : COLOR.PRIMARY} onPress={onBack}>
          <Icon value="arrow-left" color={COLOR.BACKGROUND} size={24} />
        </Button>
      )}
      {onPress && connected && (
        <Button {...BUTTON} disabled={!connected} onPress={onPress}>
          <Icon value="plus" color={COLOR.BACKGROUND} size={24} />
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
