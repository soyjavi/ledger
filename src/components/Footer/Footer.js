import { func } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { onHardwareBackPress } from '../../common';
import { ConsumerEvents } from '../../context';
import { THEME } from '../../reactor/common';
import { Button } from '../../reactor/components';
import styles from './Footer.style';

const { COLOR } = THEME;

const BUTTON = {
  color: COLOR.PRIMARY, rounded: true, shadow: true, style: styles.button,
};

class Footer extends PureComponent {
  static propTypes = {
    onBack: func,
    onHardwareBack: func,
    onPress: func,
  };

  static defaultProps = {
    onBack: undefined,
    onHardwareBack: func,
    onPress: undefined,
  };

  componentWillReceiveProps({ onHardwareBack }) {
    const { props } = this;
    const subscribe = onHardwareBack && props.onHardwareBack !== onHardwareBack;

    onHardwareBackPress(subscribe, onHardwareBack);
  }

  render() {
    const { onBack, onPress, ...inherit } = this.props;

    return (
      <View style={[styles.container, inherit.style]}>
        { onBack && <Button {...BUTTON} small={!!onPress} color={COLOR.WHITE} icon={ASSETS.back} onPress={onBack} /> }

        { onPress && (
          <ConsumerEvents>
            { ({ isConnected }) => (
              isConnected && <Button {...BUTTON} disabled={!isConnected} icon={ASSETS.add} onPress={onPress} />
            )}
          </ConsumerEvents>
        )}
      </View>
    );
  }
}

export default Footer;
