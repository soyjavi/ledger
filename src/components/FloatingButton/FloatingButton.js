import {
  arrayOf, bool, func, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { C } from 'common';
import { THEME } from 'reactor/common';
import { Motion, Text, Touchable } from 'reactor/components';
import styles from './FloatingButton.style';

const { COLORS } = C;
const { MOTION: { DURATION } } = THEME;

class FloatingButton extends PureComponent {
  static propTypes = {
    onPress: func.isRequired,
    options: arrayOf(string),
    visible: bool,
  };

  static defaultProps = {
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
      _onPress, _onOption, state: { opened }, props: { options, visible },
    } = this;

    return (
      <Motion preset="fade" visible={visible} style={styles.container}>
        <Motion timeline={[{ property: 'scale', value: opened ? 0.75 : 1 }]} style={styles.motionButton}>
          <Touchable style={[styles.button, opened && styles.opened]} onPress={_onPress}>
            <Text style={styles.text}>+</Text>
          </Touchable>
        </Motion>

        { options && (
          <View style={styles.options}>
            { options.map((option, index) => (
              <Motion key={option} delay={index * (DURATION / 2)} preset="fade" visible={opened}>
                <Touchable style={styles.option} onPress={() => _onOption(index)}>
                  <Text subtitle level={3}>{option}</Text>
                  <View style={[styles.bullet, { backgroundColor: COLORS[index] }]} />
                </Touchable>
              </Motion>
            ))}
          </View>)}
      </Motion>
    );
  }
}

export default FloatingButton;
