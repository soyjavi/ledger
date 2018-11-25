import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Consumer } from '../../context';
import { NumKeyboard } from '../../components';
import { ENV, THEME } from '../../reactor/common';
import {
  Activity, Motion, Text, Viewport,
} from '../../reactor/components';
import handshake from './modules/handshake';
import styles from './Session.style';

const { MOTION: { DURATION } } = THEME;

class Session extends PureComponent {
  static propTypes = {
    visible: bool,
  };

  static defaultProps = {
    autoLogin: false,
    visible: false,
  };

  state = {
    busy: false,
    pin: '',
  }

  _onNumber = ({ number, store, navigation }) => {
    let { state: { pin } } = this;

    pin = `${pin}${number}`;
    this.setState({ pin });

    if (pin.length === 4) {
      setTimeout(() => {
        if (store.pin === undefined || store.pin === pin) handshake(this, { pin, store, navigation });
        else this.setState({ pin: '' });
      }, DURATION);
    }
  }

  _onAutoLogin = ({ store, navigation }) => {
    this.setState({ autoLogin: true });
    handshake(this, { pin: store.pin, store, navigation });
  }

  render() {
    const {
      _onAutoLogin, _onNumber,
      props: { visible, ...inherit },
      state: { autoLogin, busy, pin },
    } = this;

    return (
      <Viewport scroll={false} visible={visible} {...inherit}>
        <Consumer>
          { ({ l10n, store, navigation }) => (
            <View style={styles.container}>
              { !ENV.IS_PRODUCTION && visible && store.pin && !autoLogin
                ? _onAutoLogin({ store, navigation })
                : undefined}
              <View style={styles.content}>
                <Text headline level={4} style={[styles.title, styles.text]}>
                  { store.pin ? l10n.WELCOME_BACK : l10n.WELCOME }
                </Text>
                <Text lighten style={styles.text}>
                  { store.pin ? l10n.WELCOME_BACK_CAPTION : l10n.WELCOME_CAPTION }
                </Text>
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

              <NumKeyboard onPress={number => _onNumber({ number, store, navigation })} />
            </View>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Session;
