import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

import { colorOpacity } from '@common';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { BORDER_RADIUS, COLOR, OPACITY, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
  },

  connected: {
    alignSelf: 'center',
    backgroundColor: colorOpacity(COLOR.ERROR, OPACITY.S),
    borderRadius: BORDER_RADIUS / 2,
    paddingHorizontal: SPACE.S,
    paddingVertical: SPACE.XS,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    right: SPACE.M,
    top: ENV.IS_WEB ? SPACE.M - SPACE.XS : SPACE.XXL + SPACE.S,
    zIndex: 2,
  },
});
