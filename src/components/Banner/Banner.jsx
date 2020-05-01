import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { THEME } from 'reactor/common';
import { Text, View } from 'reactor/components';

import { BANNERS } from '@assets';
import styles from './Banner.style';

const { COLOR } = THEME;

export const Banner = ({ align, caption, image = BANNERS.NOT_FOUND, title, ...others }) => (
  <View {...others} style={[styles.container, styles[align], others.style]}>
    <Image resizeMode="contain" source={image} style={styles.image} />
    <View marginTop="L" marginHorizontal="L">
      {title && (
        <Text headline style={[styles.text, styles[`text${align}`]]}>
          {title}
        </Text>
      )}
      {caption && (
        <Text color={COLOR.LIGHTEN} marginTop="S" style={[styles.text, styles[`text${align}`]]}>
          {caption}
        </Text>
      )}
    </View>
  </View>
);

Banner.propTypes = {
  align: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.any,
  title: PropTypes.string,
};
