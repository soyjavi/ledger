import { StyleSheet } from 'react-native';
import { LAYOUT, THEME } from 'reactor/common';

const {
  VIEWPORT: { W },
} = LAYOUT;
const { BORDER_RADIUS, COLOR, SPACE } = THEME;

const CONTENT_SIZE = W - SPACE.M * 2;
const QR_SIZE = W / 1.6;

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
    borderWidth: 2,
    borderColor: COLOR.BASE,
    display: 'flex',
    justifyContent: 'center',
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
    backgroundColor: COLOR.BACKGROUND,
    borderRadius: BORDER_RADIUS,
  },
});
