import PropTypes from 'prop-types';
import React from 'react';
import {
  // helpers
  ALIGN,
  SIZE as SPACE,
  // components
  Image,
  Text,
  View,
  // hooks
  useDevice,
} from '@lookiero/aurora';

import { BANNERS } from '@assets';

import { style } from './Banner.style';

const Banner = ({ align, caption, children, image = BANNERS.NOT_FOUND, small, title, ...others }) => {
  const {
    screen: { height },
  } = useDevice();

  console.log();

  return (
    <View {...others} alignItems={align}>
      <Image
        // resizeMode="contain"
        resizeMode="cover"
        src={image}
        customStyle={[style.image, { height: height / 3 }]}
      />
      {title && (
        <Text align={align} heading level={1} marginTop={SPACE.L}>
          {title}
        </Text>
      )}
      {caption && (
        <Text align={align} marginTop={SPACE.S}>
          {caption}
        </Text>
      )}
      {children}
    </View>
  );
};

Banner.propTypes = {
  align: PropTypes.oneOf([ALIGN.LEFT, ALIGN.CENTER, ALIGN.RIGHT]),
};

export { Banner };
