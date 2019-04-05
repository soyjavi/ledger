import { bool, node, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Text } from '../../reactor/components';
import styles from './HeadingItem.style';

class HeadingItem extends PureComponent {
  static propTypes = {
    breakline: bool,
    children: node,
    title: string.isRequired,
  };

  static defaultProps = {
    breakline: false,
    children: undefined,
  };

  render() {
    const {
      breakline, children, title, ...inherit
    } = this.props;

    return (
      <View style={[styles.container, breakline && styles.breakline]}>
        <Text subtitle level={3} {...inherit}>{title}</Text>
        { children }
      </View>
    );
  }
}

export default HeadingItem;
