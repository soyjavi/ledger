import {
  arrayOf, bool, func, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { ConsumerEvents } from '../../context';
import { THEME } from '../../reactor/common';
import { Button, Motion, Text } from '../../reactor/components';
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
    visibleOptions: false,
  }

  _onOption = (option) => {
    const { props: { onPress } } = this;

    this.setState({ visibleOptions: false });
    onPress(option);
  }

  _onPress = () => {
    const { props: { onPress, options }, state: { visibleOptions } } = this;

    if (!options) return onPress();
    this.setState({ visibleOptions: !visibleOptions });
  }

  render() {
    const {
      _onOption, _onPress,
      props: {
        onBack, onPress, options, scroll, ...inherit
      },
      state: {
        visibleOptions,
      },
    } = this;

    return (
      <View style={[styles.container, scroll && styles.scroll, inherit.style]}>
        { options && (
          <Motion
            style={styles.options}
            timeline={[{ property: 'translateY', value: visibleOptions ? 0 : -512 }]}
            pointerEvents={visibleOptions ? undefined : 'none'}
          >
            <Text headline level={6} style={styles.title}>
              $Transaction type
            </Text>
            { options.map((option, index) => (
              <Button
                color={COLOR.PRIMARY}
                key={option}
                onPress={() => _onOption(index)}
                outlined
                style={styles.buttonOption}
                title={option}
              />
            ))}
          </Motion>
        )}

        { onBack && (
          <Motion preset="pop" visible={!visibleOptions}>
            <Button
              color={COLOR.WHITE}
              icon={ASSETS.iconBack}
              onPress={onBack}
              shadow
              style={onPress && styles.buttonBack}
            />
          </Motion>
        )}

        { onPress && (
          <ConsumerEvents>
            { ({ isConnected }) => (
              <Motion timeline={[{ property: 'scale', value: visibleOptions ? 0.9 : 1 }]}>
                <Button
                  color={COLOR.PRIMARY}
                  disabled={!isConnected}
                  icon={visibleOptions ? 'closeContrast' : ASSETS.iconAdd}
                  onPress={onPress ? _onPress : undefined}
                  shadow
                />
              </Motion>
            )}
          </ConsumerEvents>
        )}
      </View>
    );
  }
}

export default Footer;
