import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Consumer } from 'context';
import { ENV } from 'reactor/common';
import {
  Activity, Motion, Text, Viewport,
} from 'reactor/components';
import { NumKeyboard } from 'components';
import generateSession from './modules/generateSession';
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
      if (store.pin === undefined || store.pin === pin) generateSession(this, { pin, store, navigation });
      else this.setState({ pin: '' });
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
              { ENV.IS_DEVELOPMENT && visible && store.pin && !busy && !store.hash &&
                _onNumber({ number: store.pin, store, navigation }) }

              <View style={styles.content}>
                <Text headline level={4} style={[styles.title, styles.text]}>
                  { store.pin ? l10n.WELCOME_BACK : l10n.WELCOME }
                </Text>
                <Text lighten style={styles.text}>
                  { store.pin ? l10n.WELCOME_BACK_CAPTION : l10n.WELCOME_CAPTION }
                </Text>
                <View style={styles.pin}>
                  { busy
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
