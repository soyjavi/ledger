import { bool, node, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Text } from '../../reactor/components';
import styles from './HeadingItem.style';

class HeadingItem extends PureComponent {
  static propTypes = {
    breakline: bool,
    children: node,
    subtitle: string,
    title: string,
  };

  static defaultProps = {
    breakline: false,
    children: undefined,
    subtitle: undefined,
    title: undefined,
  };

  render() {
    const {
      breakline, children, subtitle, title, ...inherit
    } = this.props;

    return (
      <View style={[styles.container, breakline && styles.breakline]}>
        { title && <Text headline level={6} {...inherit}>{title}</Text> }
        { subtitle && <Text subtitle level={3} {...inherit}>{subtitle}</Text> }
        { children }
      </View>
    );
  }
}

export default HeadingItem;
