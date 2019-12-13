import * as LocalAuthentication from 'expo-local-authentication';
import { bool } from 'prop-types';
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

const { IS_DEV, VERSION } = C;
const { MOTION: { DURATION } } = THEME;

class Session extends PureComponent {
  static propTypes = {
    visible: bool,
  };

  static defaultProps = {
    visible: true,
  };

  constructor(props) {
    super(props);
    this.state = { fingerprint: false, pin: '' };
  }

  async componentDidMount() {
    this.setState({
      fingerprint: IS_DEV
        || (await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync()),
    });
  }

  _onFingerprint = async ({ navigation, store }) => {
    this.setState({ fingerprint: undefined });
    let needHandshake = false;

    try {
      const { error, success } = await LocalAuthentication.authenticateAsync();
      if (success) needHandshake = true;
      else if (error) this.setState({ fingerprint: true });
    } catch (error) {
      if (IS_DEV) needHandshake = true;
    }

    if (needHandshake) handshake(this, { pin: store.pin, store, navigation });
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
      _onFingerprint, _onNumber, props: { visible, ...inherit }, state: { fingerprint, busy, pin },
    } = this;

    console.log('<Session>', {
      fingerprint, visible, busy, pin,
    });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ l10n, store, navigation }) => (
            <View style={styles.container}>
              { visible && fingerprint && store.pin
                ? _onFingerprint({ store, navigation }) && <Fragment />
                : undefined }
              <View style={styles.content}>
                <View style={styles.row}>
                  <Image source={ASSETS.logo} resizeMode="contain" style={styles.logo} />
                  <Text headline style={styles.textName}>volt.</Text>
                </View>
                <View style={styles.pin}>
                  { busy
                    ? <Activity size="large" style={styles.activity} />
                    : [1, 2, 3, 4].map((number) => (
                      <Motion
                        key={number}
                        style={[styles.bullet, pin.length >= number && styles.bulletActive]}
                        timeline={[{ property: 'scale', value: pin.length >= number ? 1 : 0.8 }]}
                      />
                    ))}
                </View>
                <Text lighten>
                  { store.pin && fingerprint ? l10n.ENTER_PIN_OR_FINGERPRINT : l10n.ENTER_PIN }
                </Text>
              </View>

              { store.pin && !busy && fingerprint && <Image source={ASSETS.fingerprint} style={styles.fingerprint} /> }

              <NumKeyboard onPress={(number) => _onNumber({ number, store, navigation })} />
              <Text lighten caption style={styles.textVersion}>{`v${VERSION}`}</Text>
            </View>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Session;
