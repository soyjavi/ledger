import { bool, func } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import {
  Activity, Motion, Text, Viewport,
} from '../../reactor/components';
import { NumKeyboard } from './components';
import handshake from './modules/handshake';
import styles from './Session.style';

const { VERSION } = C;
const { MOTION: { DURATION } } = THEME;

class Session extends PureComponent {
  static propTypes = {
    getFingerprintAsync: func,
    visible: bool,
  };

  static defaultProps = {
    getFingerprintAsync: undefined,
    visible: true,
  };

  state = {
    busy: false,
    askFingerprint: false,
    pin: '',
  }

  _onFingerprint = async ({ navigation, store }) => {
    const { props: { getFingerprintAsync } } = this;

    this.setState({ askFingerprint: true });
    if (getFingerprintAsync) {
      const { success } = await getFingerprintAsync('Use your fingerprint.');
      if (success) handshake(this, { pin: store.pin, store, navigation });
      else this.setState({ askFingerprint: false });
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

  render() {
    const {
      _onFingerprint, _onNumber,
      props: { getFingerprintAsync, visible, ...props },
      state: { askFingerprint, busy, pin },
    } = this;
    console.log('<Session>', { askFingerprint, visible, busy, pin });

    return (
      <Viewport {...props} scroll={false} visible={visible}>
        <Consumer>
          { ({ l10n, store, navigation }) => (
            <View style={styles.container}>
              { visible && getFingerprintAsync && !askFingerprint && store.pin
                ? _onFingerprint({ store, navigation }) && <Fragment />
                : undefined }
              <View style={styles.content}>
                <Image source={ASSETS.logo} resizeMode="contain" style={styles.logo} />
                <Text headline level={4} style={styles.text}>voltvault</Text>
                <View style={styles.pin}>
                  { busy
                    ? <Activity size="large" style={styles.activity} />
                    : [1, 2, 3, 4].map(number => (
                      <Motion
                        key={number}
                        style={[styles.bullet, pin.length >= number && styles.bulletActive]}
                        timeline={[{ property: 'scale', value: pin.length >= number ? 1 : 0.8 }]}
                      />
                    ))}
                </View>
                <Text level={2} lighten style={styles.text}>
                  { store.pin && getFingerprintAsync ? l10n.ENTER_PIN_OR_FINGERPRINT : l10n.ENTER_PIN }
                </Text>
              </View>

              { store.pin && !busy && getFingerprintAsync && (
                <Image source={ASSETS.fingerprint} style={styles.fingerprint} />)}
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
