import { node, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import { Text } from '../../reactor/components';
import styles from './HeadingItem.style';

class HeadingItem extends PureComponent {
  static propTypes = {
    children: node,
    title: string.isRequired,
  };

  static defaultProps = {
    children: undefined,
  };

  render() {
    const { props: { children, title, ...inherit } } = this;

    return (
      <View style={styles.container}>
        <Text subtitle level={3} {...inherit}>{title}</Text>
        { children }
      </View>
    );
  }
}

export default HeadingItem;
