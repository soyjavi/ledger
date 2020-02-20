import { StyleSheet } from 'react-native';

import { useEnvironment } from '../../reactor/hooks';
import { THEME } from '../../reactor/common';

const ENV = useEnvironment();
const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    bottom: SPACE.M,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    right: SPACE.M,
    zIndex: 1,
  },
});
