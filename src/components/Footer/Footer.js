import { FontAwesome } from '@expo/vector-icons';
import { func } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { onHardwareBackPress } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Button } from '../../reactor/components';
import styles from './Footer.style';

const { COLOR } = THEME;

const BUTTON = {
  color: COLOR.PRIMARY, large: true, rounded: true, shadow: true, style: styles.button,
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
      <Consumer>
        { ({ events: { connected } }) => (
          <View style={[styles.container, inherit.style]}>
            { onBack && (
              <Button {...BUTTON} large={onPress === undefined} onPress={onBack} small>
                <FontAwesome name="chevron-plus" color={COLOR.BASE} size="36" />
              </Button>
            )}
            { onPress && connected && (
              <Button {...BUTTON} disabled={!connected} onPress={onPress}>
                <FontAwesome name="plus" color={COLOR.BASE} size="36" />
              </Button>
            )}
          </View>
        )}
      </Consumer>
    );
  }
}

export default Footer;
