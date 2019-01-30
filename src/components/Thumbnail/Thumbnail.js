import { string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Icon, Text } from '../../reactor/components';
import styles from './Thumbnail.style';

const { COLOR } = THEME;

const Thumbnail = ({
  caption, color, icon, title, ...inherit
}) => (
  <View style={[styles.container, inherit.style, { backgroundColor: color }]}>
    { icon && <Icon value={icon} style={styles.icon} /> }
    { title && <Text caption style={styles.text}>{title}</Text>}
    { caption && <Text caption level={2} style={[styles.caption, styles.text]}>{caption}</Text>}
  </View>
);

Thumbnail.propTypes = {
  caption: string,
  color: string,
  icon: string,
  title: string,
};

Thumbnail.defaultProps = {
  caption: undefined,
  color: COLOR.TEXT_LIGHTEN,
  icon: undefined,
  title: undefined,
};

export default Thumbnail;
