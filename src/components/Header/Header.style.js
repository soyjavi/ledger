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
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  content: {
    alignSelf: 'flex-end',
    paddingBottom: SPACE.S + SPACE.XS,
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...Platform.select({
      web: { paddingTop: SPACE.S + SPACE.XS },
    }),
  },

  title: {
    flex: 4,
    maxWidth: '85%',
  },
});
