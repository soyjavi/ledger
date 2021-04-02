import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  visible: {
    borderBottomColor: COLOR.BASE,
    borderBottomWidth: 1,
  },

  content: {
    alignSelf: 'flex-end',
    height: SPACE.XL + SPACE.M,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  title: {
    flex: 4,
    maxWidth: '85%',
  },
});
