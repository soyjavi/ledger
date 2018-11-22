import {
  arrayOf, bool, func, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { iconAdd } from '../../assets';
import { C } from '../../common';
import { THEME } from '../../reactor/common';
import {
  Icon, Motion, Text, Touchable,
} from '../../reactor/components';
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
      <View style={styles.container}>
        { options && visible && (
          <View style={[styles.options, opened && styles.optionsOpened]} pointerEvents={opened ? undefined : 'none'}>
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
                    <View style={[styles.optionBullet, { backgroundColor: COLORS[index] }]} />
                  </View>
                </Touchable>
              </Motion>
            ))}
          </View>)}

        <Motion preset="fade" visible={visible} delay={visible ? DURATION * 2 : 0}>
          <Motion timeline={[{ property: 'scale', value: opened ? 0.75 : 1 }]}>
            <Touchable onPress={_onPress}>
              <View style={[styles.button, opened && styles.buttonOpened]}>
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
