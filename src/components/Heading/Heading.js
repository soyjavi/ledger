import { bool, node, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { Text } from '../../reactor/components';
import styles from './Heading.style';

class Heading extends PureComponent {
  static propTypes = {
    breakline: bool,
    children: node,
    logo: bool,
    subtitle: string,
    title: string,
  };

  static defaultProps = {
    breakline: false,
    children: undefined,
    logo: false,
    subtitle: undefined,
    title: undefined,
  };

  render() {
    const {
      breakline, children, logo, subtitle, title, ...inherit
    } = this.props;

    return (
      <View style={[styles.container, breakline && styles.breakline]}>
        { logo && <Image source={ASSETS.logo} resizeMode="contain" style={styles.logo} /> }
        <View style={styles.content}>
          { title && <Text headline level={6}>{title}</Text> }
          { subtitle && <Text subtitle level={3} {...inherit}>{subtitle}</Text> }
        </View>
        { children }
      </View>
    );
  }
}

export default Heading;
