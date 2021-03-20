import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  blur: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
  },

  container: {
    height: 88,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  visible: {
    borderBottomColor: COLOR.BASE_LIGHTEN,
    borderBottomWidth: 1,
  },

  content: {
    alignSelf: 'flex-end',
    height: SPACE.XXL,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  title: {
    flex: 4,
    maxWidth: '85%',
  },
});
