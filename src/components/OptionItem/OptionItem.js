import {
  bool, func, node, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Icon, Text, Touchable } from '../../reactor/components';
import ASSETS from '../../assets';

import styles from './OptionItem.style';

const { COLOR } = THEME;

class OptionItem extends PureComponent {
  static propTypes = {
    active: bool,
    caption: string,
    children: node,
    disabled: bool,
    onChange: func.isRequired,
    onPress: func,
    title: string.isRequired,
  };

  static defaultProps = {
    active: true,
    caption: undefined,
    children: undefined,
    disabled: false,
    onPress: undefined,
  };

  render() {
    const {
      props: {
        active, caption, children, disabled, onChange, onPress, title,
      },
    } = this;

    return (
      <View style={styles.container}>
        <Touchable onPress={onPress} rippleColor={COLOR.PRIMARY} style={styles.content}>
          <Text subtitle level={2} numberOfLines={1} lighten={disabled}>{title}</Text>
          { caption && <Text caption lighten>{caption}</Text> }
          { children }
        </Touchable>
        <Touchable onPress={() => onChange(!active)} rippleColor={COLOR.ACCENT}>
          <View style={[styles.iconContainer, active && styles.iconActive]}>
            { active && <Icon value={ASSETS.checked} style={styles.icon} /> }
          </View>
        </Touchable>
      </View>
    );
  }
}

export default OptionItem;
