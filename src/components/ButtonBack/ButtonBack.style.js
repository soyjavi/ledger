import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

import { OPTION_SIZE } from '../Option';

const ENV = useEnvironment();
const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    bottom: SPACE.M,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    right: 0,
    width: OPTION_SIZE,
    zIndex: 2,
  },
});
