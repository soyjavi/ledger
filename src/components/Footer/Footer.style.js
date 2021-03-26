import { Platform, StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { SPACE } = THEME;

export default StyleSheet.create({
  blur: {
    height: '100%',
    width: '100%',
  },

  container: {
    height: Platform.OS === 'ios' ? 80 : undefined,
    bottom: 0,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    width: '100%',
    zIndex: 1,
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  option: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: SPACE.M,
  },
});
