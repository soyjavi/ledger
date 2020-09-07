import { StyleSheet } from 'react-native';
import { LAYOUT, THEME } from 'reactor/common';

import { HEADER_HEIGHT } from '@components';

const {
  VIEWPORT: { W },
} = LAYOUT;
const { BORDER_RADIUS, COLOR, SPACE } = THEME;

const CONTENT_SIZE = W - SPACE.L * 2;
const QR_SIZE = W - SPACE.M;

export default StyleSheet.create({
  camera: {
    backgroundColor: COLOR.BACKGROUND,
    height: CONTENT_SIZE,
    width: CONTENT_SIZE,
  },

  cameraViewport: {
    borderRadius: SPACE.M,
    flex: 1,
  },

  content: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: CONTENT_SIZE,
    width: CONTENT_SIZE,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },

  legend: {
    textAlign: 'center',
  },

  qr: {
    height: QR_SIZE,
    width: QR_SIZE,
    backgroundColor: COLOR.TRANSPARENT,
  },
  scroll: {
    paddingVertical: HEADER_HEIGHT,
  },
});
