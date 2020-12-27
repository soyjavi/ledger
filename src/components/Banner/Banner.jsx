import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { Text, View } from 'reactor/components';

import { BANNERS } from '@assets';

import styles from './Banner.style';

const Banner = ({ align, caption, children, image = BANNERS.NOT_FOUND, small, title, ...others }) => (
  <View {...others} style={[styles.container, styles[align], others.style]}>
    <Image resizeMode="contain" source={image} style={[styles.image, small && styles.imageSmall]} />
    <View marginTop="L" style={styles[align]}>
      {title && (
        <Text bold headline={!small} subtitle={small} style={[styles.text, styles[`text${align}`]]}>
          {title}
        </Text>
      )}
      {caption && (
        <Text marginTop="S" style={[styles.text, styles[`text${align}`]]}>
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
  small: PropTypes.bool,
  title: PropTypes.string,
};

export { Banner };
