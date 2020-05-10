import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { Text, View } from 'reactor/components';

import { BANNERS } from '@assets';
import styles from './Banner.style';

export const Banner = ({ align, caption, children, image = BANNERS.NOT_FOUND, title, ...others }) => (
  <View {...others} style={[styles.container, styles[align], others.style]}>
    <Image resizeMode="contain" source={image} style={styles.image} />
    <View marginTop="L">
      {title && (
        <Text headline style={[styles.text, styles[`text${align}`]]}>
          {title}
        </Text>
      )}
      {caption && (
        <Text marginTop="XS" style={[styles.text, styles.caption, styles[`text${align}`]]}>
          {caption}
        </Text>
      )}
    </View>
    {children}
  </View>
);

Banner.propTypes = {
  align: PropTypes.string,
  caption: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.any,
  title: PropTypes.string,
};
