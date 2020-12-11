import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

import { colorOpacity } from '@common';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { COLOR, OPACITY, SPACE } = THEME;
const IMAGE_SIZE = SPACE.M + SPACE.XS;

export default StyleSheet.create({
  container: {
    height: SPACE.XXL,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    justifyContent: 'space-between',
    top: 0,
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: colorOpacity(COLOR.BACKGROUND, OPACITY.L),
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
