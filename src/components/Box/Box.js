import { arrayOf, node, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './Box.style';

class Box extends PureComponent {
  static propTypes = {
    children: node.isRequired,
    colors: arrayOf(string),
  };

  static defaultProps = {
    colors: ['#333', '#202020', '#202020'],
  };

  render() {
    const { children, colors, ...inherit } = this.props;

    return (
      <LinearGradient colors={colors} start={[0, 0]} end={[1, 1]} style={[styles.container, inherit.style]}>
        {children}
      </LinearGradient>
    );
  }
}

export default Box;
