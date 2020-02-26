import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';
import { HEADER_HEIGHT } from '../../components';

const {
  VIEWPORT: { W },
} = LAYOUT;
const { SPACE } = THEME;
const QR_SIZE = W - SPACE.M * 2;

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

  options: {
    marginBottom: SPACE.M,
  },

  qr: {
    alignSelf: 'center',
    height: QR_SIZE,
    marginTop: SPACE.XXS,
    marginBottom: SPACE.XS,
    width: QR_SIZE,
  },
});
