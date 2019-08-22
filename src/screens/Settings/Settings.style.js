import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { VIEWPORT: { W } } = LAYOUT;
const { SPACE } = THEME;
const QR_SIZE = W - (SPACE.MEDIUM * 2);

export default StyleSheet.create({
  activity: {
    height: 28,
  },

  button: {
    marginRight: -SPACE.XS,
  },

  cameraViewport: {
    flex: 1,
  },

  caption: {
    textAlign: 'center',
  },

  container: {
    paddingVertical: HEADER_HEIGHT,
  },

  content: {
    marginHorizontal: SPACE.MEDIUM,
  },

  options: {
    marginBottom: SPACE.MEDIUM,
  },

  qr: {
    alignSelf: 'center',
    height: QR_SIZE,
    marginTop: SPACE.XXS,
    marginBottom: SPACE.XS,
    width: QR_SIZE,
  },
});
