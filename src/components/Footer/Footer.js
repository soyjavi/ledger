import {
  arrayOf, bool, func, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { Consumer, ConsumerEvents } from '../../context';
import { THEME } from '../../reactor/common';
import { Button, Dialog } from '../../reactor/components';
import CardOption from '../CardOption';
import styles from './Footer.style';

const { COLOR } = THEME;

class Footer extends PureComponent {
  static propTypes = {
    onBack: func,
    onPress: func,
    options: arrayOf(string),
    scroll: bool,
  };

  static defaultProps = {
    onBack: undefined,
    onPress: undefined,
    options: undefined,
    scroll: false,
  };

  state = {
    dialog: true,
  }

  _onOption = (option) => {
    const { props: { onPress } } = this;

    this.setState({ dialog: false });
    onPress(option);
  }

  _onPress = () => {
    const { props: { onPress, options }, state: { dialog } } = this;

    if (!options) return onPress();
    this.setState({ dialog: !dialog });
  }

  render() {
    const {
      _onOption, _onPress,
      props: {
        onBack, onPress, options, scroll, ...inherit
      },
      state: { dialog },
    } = this;

    return (
      <View style={[styles.container, scroll && styles.scroll, inherit.style]}>
        { onBack && (
          <Button
            color={COLOR.WHITE}
            icon={ASSETS.iconBack}
            onPress={onBack}
            shadow
            style={onPress && styles.buttonBack}
          />
        )}

        { onPress && (
          <ConsumerEvents>
            { ({ isConnected }) => (
              <Button
                color={COLOR.PRIMARY}
                disabled={!isConnected}
                icon={ASSETS.iconAdd}
                onPress={onPress ? _onPress : undefined}
                shadow
              />
            )}
          </ConsumerEvents>
        )}

        { options && (
          <Consumer>
            { ({ l10n }) => (
              <Dialog
                onClose={() => this.setState({ dialog: false })}
                title={l10n.CHOOSE_TRANSACTION_TYPE}
                style={styles.frame}
                styleContainer={styles.dialog}
                visible={dialog}
              >
                <View style={styles.cards}>
                  { options.map((option, index) => (
                    <CardOption
                      key={option}
                      icon={ASSETS[option.toLowerCase()]}
                      onPress={() => _onOption(index)}
                      style={[styles.card, index === 2 && styles.cardLast]}
                      title={option}
                    />
                  ))}
                </View>
              </Dialog>
            )}
          </Consumer>
        )}
      </View>
    );
  }
}

export default Footer;
