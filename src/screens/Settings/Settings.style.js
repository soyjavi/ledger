import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const {
  STYLE: { CONTENT, HEADER_HEIGHT },
} = C;
const {
  VIEWPORT: { W },
} = LAYOUT;
const { COLOR, SPACE } = THEME;
const QR_SIZE = W - SPACE.MEDIUM * 2;

export default StyleSheet.create({
  activity: {
    height: 28,
  },

  button: {
    backgroundColor: COLOR.ACCENT,
  },

  cameraViewport: {
    flex: 1,
  },

  caption: {
    marginHorizontal: SPACE.MEDIUM,
    marginVertical: SPACE.XS,
    textAlign: 'center',
  },

  container: {
    paddingVertical: HEADER_HEIGHT,
  },

  content: CONTENT,

  options: {
    marginBottom: SPACE.MEDIUM,
  },

  qr: {
    alignSelf: 'center',
    height: QR_SIZE,
    width: QR_SIZE,
  },
});
