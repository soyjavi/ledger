import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

import { colorOpacity } from '@common';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { COLOR, SPACE } = THEME;
const IMAGE_SIZE = SPACE.M + SPACE.XS;

export const HEADER_HEIGHT = SPACE.XXL;

export default StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    justifyContent: 'space-between',
    top: 0,
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: colorOpacity(COLOR.BACKGROUND, 0.95),
  },

  content: {
    flex: 4,
    maxWidth: '85%',
  },

  image: {
    borderRadius: IMAGE_SIZE / 2,
    marginRight: SPACE.S,
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
});
