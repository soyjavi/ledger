import {
  // helpers
  SIZE,
  Theme,
  // components
  Icon,
  Image,
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { useConnection } from '@context';
import { ServiceLocation } from '@services';

import { style, MAP_HEIGHT, MAP_SMALL_HEIGHT, MAP_WIDTH } from './HeatMap.style';

const HeatMap = ({ caption, children, color, darkMode = true, points, precission = 0.001, small }) => {
  const { online } = useConnection();

  return (
    <>
      <Image
        resizeMode="cover"
        src={
          online && points
            ? ServiceLocation.uriMap({
                color: color || Theme.get('colorPrimary'),
                darkMode,
                height: small ? MAP_SMALL_HEIGHT : MAP_HEIGHT,
                points,
                precission,
                small,
                width: MAP_WIDTH,
              })
            : undefined
        }
        style={[style.image, small && style.small]}
      />
      {caption && (
        <View style={style.caption}>
          <Icon name="map-pin" style={[style.icon, style.colorCaption]} />
          <Text detail flex={SIZE.XS} level={2} style={style.colorCaption}>
            {caption}
          </Text>
          {children}
        </View>
      )}
    </>
  );
};

HeatMap.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  darkMode: PropTypes.bool,
  points: PropTypes.arrayOf(PropTypes.array),
  precission: PropTypes.number,
  small: PropTypes.bool,
};

export { HeatMap };
