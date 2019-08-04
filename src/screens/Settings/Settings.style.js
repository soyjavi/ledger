import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { VIEWPORT: { W } } = LAYOUT;
const { SPACE } = THEME;
const QR_SIZE = W - (SPACE.MEDIUM * 2);

export default StyleSheet.create({
  button: {
    marginHorizontal: SPACE.MEDIUM,
  },

  container: {
    paddingVertical: HEADER_HEIGHT,
  },

  options: {
    marginBottom: SPACE.MEDIUM,
  },

  qr: {
    alignSelf: 'center',
    height: QR_SIZE,
    marginTop: SPACE.S,
    marginBottom: SPACE.MEDIUM,
    width: QR_SIZE,
  },
});
