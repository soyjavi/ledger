import {
  arrayOf, bool, func, string,
} from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
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
        <Motion preset="fade" visible={visible}>
          <Motion style={styles.motionButton} timeline={[{ property: 'scale', value: opened ? 0.75 : 1 }]}>
            <Touchable style={[styles.button, opened && styles.opened]} onPress={_onPress}>
              <Icon value={iconAdd} style={styles.icon} />
            </Touchable>
          </Motion>

          { options && (
            <View style={styles.options}>
              { options.map((option, index) => (
                <Motion key={option} delay={index * (DURATION / 2)} preset="fade" visible={opened}>
                  <Touchable style={styles.option} onPress={() => _onOption(index)}>
                    <Fragment>
                      <Text subtitle level={3}>{option}</Text>
                      <View style={[styles.bullet, { backgroundColor: COLORS[index] }]} />
                    </Fragment>
                  </Touchable>
                </Motion>
              ))}
            </View>)}
        </Motion>
      </View>
    );
  }
}

export default FloatingButton;
