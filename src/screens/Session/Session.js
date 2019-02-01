import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import { Consumer } from '../../context';
import { NumKeyboard } from '../../components';
import { THEME } from '../../reactor/common';
import {
  Activity, Motion, Text, Viewport,
} from '../../reactor/components';
import handshake from './modules/handshake';
import styles from './Session.style';

const { iconFingerprint, logo } = ASSETS;
const { VERSION } = C;
const { MOTION: { DURATION } } = THEME;

class Session extends PureComponent {
  static propTypes = {
    visible: bool,
  };

  static defaultProps = {
    visible: true,
  };

  state = {
    busy: false,
    pin: '',
  }

  async componentDidMount() {
    const { props: { getFingerprintAsync } } = this;

    if (getFingerprintAsync && await getFingerprintAsync()) {
      console.log('fingerprint readed');
    }
  }

  _onNumber = ({ number, store, navigation }) => {
    let { state: { pin } } = this;

    pin = `${pin}${number}`;
    this.setState({ pin });

    if (pin.length === 4) {
      setTimeout(() => {
        if (store.pin === undefined || store.pin === pin) handshake(this, { pin, store, navigation });
        else this.setState({ pin: '' });
      }, DURATION / 2);
    }
  }

  _ = props => handshake(this, props);

  render() {
    const { _onNumber, props: { visible, ...props }, state: { busy, pin } } = this;

    return (
      <Viewport {...props} scroll={false} visible={visible}>
        <Consumer>
          { ({
            l10n, store, navigation, events: { getFingerprintAsync } = {},
          }) => (
            <View style={styles.container}>
              { !navigation.stack.includes('Dashboard') && visible && store.pin && !busy
                ? this._({ pin: store.pin, store, navigation }) && <View />
                : undefined}
              <View style={styles.content}>
                <Image source={logo} resizeMode="contain" style={styles.logo} />
                <View style={styles.pin}>
                  { busy || store.hash
                    ? <Activity size="large" style={styles.activity} />
                    : [1, 2, 3, 4].map(number => (
                      <Motion
                        key={number}
                        style={[styles.bullet, pin.length >= number && styles.bulletActive]}
                        timeline={[{ property: 'scale', value: pin.length >= number ? 1 : 0.8 }]}
                      />))}
                </View>
                <Text level={2} lighten style={styles.text}>
                  { busy ? l10n.LOADING_PROFILE : l10n.ENTER_PIN }
                </Text>
              </View>
              { getFingerprintAsync && (
                <Image source={iconFingerprint} resizeMode="contain" style={styles.fingerprint} />)}

              <NumKeyboard onPress={number => _onNumber({ number, store, navigation })} />
              <Text lighten caption level={3} style={styles.text}>{`v${VERSION}`}</Text>
            </View>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Session;
