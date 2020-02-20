import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { useEnvironment } from '../../reactor/hooks';

const ENV = useEnvironment();
const {
  STYLE: { HEADER_HEIGHT },
} = C;

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    height: HEADER_HEIGHT,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 2,
  },
});
