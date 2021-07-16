import { Theme } from '@lookiero/aurora';
import { Dimensions } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet';

const { width } = Dimensions.get('window');
const { spaceM } = Theme.get();

const CONTENT_SIZE = width - spaceM * 2;
const QR_SIZE = width / 1.6;

export const style = StyleSheet.create({
  camera: {
    backgroundColor: '$colorInfo',
    height: CONTENT_SIZE,
    width: CONTENT_SIZE,
  },

  cameraViewport: {
    borderRadius: '$borderRadius',
    flex: 1,
  },

  offset: {
    marginHorizontal: '$spaceM',
  },

  qr: {
    height: QR_SIZE,
    width: QR_SIZE,
    backgroundColor: '$colorContent',
    borderRadius: '$borderRadius',
  },

  qrBackground: {
    backgroundColor: '$colorInfo',
    borderRadius: '$borderRadius',
    alignItems: 'center',
    alignContent: 'center',
    height: CONTENT_SIZE,
    justifyContent: 'center',
    marginBottom: '$spaceL',
    overflow: 'hidden',
    width: CONTENT_SIZE,
  },

  qrHint: {
    bottom: '$spaceM',
    marginHorizontal: '$spaceM',
    position: 'absolute',
    textAlign: 'center',
  },

  slider: {
    marginBottom: '$spaceXS',
  },
});
