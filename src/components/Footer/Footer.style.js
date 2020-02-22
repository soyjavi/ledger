import { StyleSheet } from 'react-native';

import { useEnvironment } from '../../reactor/hooks';
import { THEME } from '../../reactor/common';

const ENV = useEnvironment();
const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  button: {
    height: SPACE.XXL,
    width: SPACE.XXL,
    paddingHorizontal: 0,
  },

  buttonOutlined: {
    backgroundColor: COLOR.BACKGROUND,
  },

  container: {
    bottom: SPACE.M,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    right: SPACE.M,
    zIndex: 1,
  },
});
