import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import { logo } from '../../assets';
import { Consumer } from '../../context';
import { NumKeyboard } from '../../components';
import {
  Activity, Motion, Text, Viewport,
} from '../../reactor/components';
import handshake from './modules/handshake';
import styles from './Session.style';

class Session extends PureComponent {
  static propTypes = {
    visible: bool,
  };

  static defaultProps = {
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
      this.setState({ pin });
      if (store.pin === undefined || store.pin === pin) handshake(this, { pin, store, navigation });
      else setTimeout(() => this.setState({ pin: '' }), 100);
    }
  }

  render() {
    const {
      _onNumber,
      props: { visible, ...inherit },
      state: { busy, pin },
    } = this;

    return (
      <Viewport scroll={false} visible={visible} {...inherit}>
        <Consumer>
          { ({ l10n, store, navigation }) => (
            <View style={styles.container}>
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

              <NumKeyboard onPress={number => _onNumber({ number, store, navigation })} />
            </View>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Session;
