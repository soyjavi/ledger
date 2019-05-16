import { bool, func } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { onHardwareBackPress } from '../../common';
import { ConsumerEvents } from '../../context';
import { THEME } from '../../reactor/common';
import { Button } from '../../reactor/components';
import styles from './Footer.style';

const { COLOR } = THEME;

class Footer extends PureComponent {
  static propTypes = {
    onBack: func,
    onHardwareBack: func,
    onPress: func,
    scroll: bool,
  };

  static defaultProps = {
    onBack: undefined,
    onHardwareBack: func,
    onPress: undefined,
    scroll: false,
  };

  componentWillReceiveProps({ onHardwareBack }) {
    const { props } = this;
    const subscribe = onHardwareBack && props.onHardwareBack !== onHardwareBack;

    onHardwareBackPress(subscribe, onHardwareBack);
  }

  render() {
    const {
      props: {
        onBack, onPress, scroll, ...inherit
      },
    } = this;

    return (
      <View style={[styles.container, scroll && styles.scroll, inherit.style]}>
        { onBack && (
          <Button
            color={COLOR.WHITE}
            icon={ASSETS.back}
            onPress={onBack}
            shadow
            style={onPress && styles.buttonBack}
          />
        )}

        { onPress && (
          <ConsumerEvents>
            { ({ isConnected }) => (
              isConnected && (
                <Button
                  color={COLOR.PRIMARY}
                  disabled={!isConnected}
                  icon={ASSETS.add}
                  onPress={onPress}
                  shadow
                />
              )
            )}
          </ConsumerEvents>
        )}
      </View>
    );
  }
}

export default Footer;
