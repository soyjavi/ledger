import { func } from 'prop-types';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { onHardwareBackPress } from '../../common';
import { useConnection } from '../../context';
import { THEME } from '../../reactor/common';
import { Button } from '../../reactor/components';
import styles from './Footer.style';

const { COLOR } = THEME;

const BUTTON = {
  color: COLOR.PRIMARY, large: true, rounded: true, shadow: true, style: styles.button,
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
        <Button
          {...BUTTON}
          icon={ASSETS.back}
          large={onPress === undefined}
          onPress={onBack}
          small
        />
      )}
      { onPress && connected && (
        <Button
          {...BUTTON}
          disabled={!connected}
          icon={ASSETS.add}
          onPress={onPress}
        />
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
  onHardwareBack: func,
  onPress: undefined,
};

export default Footer;
