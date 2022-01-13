import {
  // helpers
  ALIGN,
  COLOR,
  SIZE as SPACE,
  // components
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

import { BANNERS } from '@assets';

import { style } from './Banner.style';

const Banner = ({ align, caption, children, image = BANNERS.NOT_FOUND, title, ...others }) => {
  const textAlign = align === ALIGN.END ? ALIGN.RIGHT : align;

  return (
    <View {...others} alignItems={align} alignContent={align} justifyContent={align}>
      <Image
        resizeMode="contain"
        source={image}
        style={style.image}
        // style={{ backgroundColor: 'red', height: height / 2.5, width: width / 2 }}
      />
      {title && (
        <Text align={textAlign} heading level={1} marginTop={SPACE.L} style={style.content}>
          {title}
        </Text>
      )}
      {caption && (
        <Text align={textAlign} color={COLOR.GRAYSCALE_L} marginTop={SPACE.S} style={style.content}>
          {caption}
        </Text>
      )}
      {children}
    </View>
  );
};

Banner.propTypes = {
  align: PropTypes.oneOf([ALIGN.LEFT, ALIGN.CENTER, ALIGN.END]),
  caption: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
};

export { Banner };
