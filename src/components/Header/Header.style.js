import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';
import { useEnvironment } from '../../reactor/hooks';

const { UNIT, COLOR } = THEME;

const ENV = useEnvironment();

export const HEADER_HEIGHT = UNIT * 7;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.OVERLAY,
    height: HEADER_HEIGHT,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 2,
  },
});
