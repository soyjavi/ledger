import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Consumer } from 'context';
import { ProgressBar, Text, Viewport } from 'reactor/components';
import { NumKeyboard, Pin } from './components';
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
          { ({ store, navigation }) => (
            <View style={styles.content}>
              { visible && store.pin && !busy && !store.hash && _onNumber({ number: store.pin, store, navigation }) }
              { busy && <ProgressBar duration={1000} progress={busy ? 1 : 0} style={styles.progressBar} /> }

              <Text headline level={3} style={styles.text}>voltvault</Text>
              <Pin value={pin} />
              { !store.pin && (
                <Text level={2} style={styles.text}>
                  $This is your first time here, just choose a pin
                </Text>)}

              <NumKeyboard onPress={number => _onNumber({ number, store, navigation })} />
            </View>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Session;
