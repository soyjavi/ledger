import {
  arrayOf, bool, func, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import { THEME } from '../../reactor/common';
import {
  Icon, Motion, Text, Touchable,
} from '../../reactor/components';
import styles, { CONTAINER_SIZE } from './FloatingButton.style';

const { iconAdd } = ASSETS;
const { COLORS } = C;
const { MOTION: { DURATION } } = THEME;

class FloatingButton extends PureComponent {
  static propTypes = {
    color: string,
    onPress: func.isRequired,
    options: arrayOf(string),
    visible: bool,
  };

  static defaultProps = {
    color: undefined,
    options: undefined,
    visible: false,
  };

  state = {
    opened: false,
  };

  _onPress = () => {
    const { props: { onPress, options }, state: { opened } } = this;

    if (!options) onPress();
    else this.setState({ opened: !opened });
  }

  _onOption = (option) => {
    const { props: { onPress } } = this;

    this.setState({ opened: false });
    onPress(option);
  }

  render() {
    const {
      _onPress, _onOption, state: { opened }, props: { color, options, visible },
    } = this;

    return (
      <View style={styles.container}>
        { options && visible && (
          <View style={styles.options} pointerEvents={opened ? undefined : 'none'}>
            { options.map((option, index) => (
              <Motion
                delay={(index / 2) * (DURATION / 2)}
                duration={DURATION / 2}
                key={option}
                preset="fade"
                visible={opened}
              >
                <Touchable onPress={opened ? () => _onOption(index) : undefined}>
                  <View style={styles.option}>
                    <Text subtitle level={3}>{option}</Text>
                    <View style={[styles.bullet, styles[option.toLowerCase()]]} />
                  </View>
                </Touchable>
              </Motion>
            ))}
          </View>)}

        <Motion preset="pop" visible={visible} delay={visible ? DURATION * 2 : 0}>
          <Motion timeline={[{ property: 'scale', value: visible && opened ? 0.75 : 1 }]}>
            <Touchable containerBorderRadius={CONTAINER_SIZE / 2} onPress={_onPress} rippleColor={COLORS.BACKGROUND}>
              <View
                style={[
                  styles.button,
                  visible && opened && styles.buttonOpened,
                  color && { backgroundColor: color, shadowColor: color },
                ]}
              >
                <Icon value={iconAdd} style={styles.icon} />
              </View>
            </Touchable>
          </Motion>
        </Motion>
      </View>
    );
  }
}

export default FloatingButton;
