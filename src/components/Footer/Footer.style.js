import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { SPACE } = THEME;

export default StyleSheet.create({
  blur: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACE.XS,
    width: '100%',
  },

  container: {
    bottom: 0,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    left: 0,
    right: 0,
    width: 'auto',
    zIndex: 1,
  },
});
