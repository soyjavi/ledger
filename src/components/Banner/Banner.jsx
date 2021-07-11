import {
  // helpers
  ALIGN,
  COLOR,
  SIZE as SPACE,
  // components
  Image,
  Text,
  View,
  // hooks
  useDevice,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { BANNERS } from '@assets';

const Banner = ({ align, caption, children, image = BANNERS.NOT_FOUND, title, ...others }) => {
  const {
    screen: { height, width },
  } = useDevice();

  return (
    <View {...others} alignItems={align}>
      <Image resizeMode="contain" src={image} style={{ height: height / 3, width: width * 0.9 }} />
      {title && (
        <Text align={align} heading level={1} marginTop={SPACE.L}>
          {title}
        </Text>
      )}
      {caption && (
        <Text align={align} color={COLOR.GRAYSCALE_L} marginTop={SPACE.S}>
          {caption}
        </Text>
      )}
      {children}
    </View>
  );
};

Banner.propTypes = {
  align: PropTypes.oneOf([ALIGN.LEFT, ALIGN.CENTER, ALIGN.RIGHT]),
  caption: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
};

export { Banner };
