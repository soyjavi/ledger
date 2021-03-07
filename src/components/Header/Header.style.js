import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { SPACE } = THEME;

export default StyleSheet.create({
  blur: {
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  container: {
    height: SPACE.XXL,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  content: {
    flex: 4,
    maxWidth: '85%',
  },
});
