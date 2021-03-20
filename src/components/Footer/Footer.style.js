import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  blur: {
    height: '100%',
    width: '100%',
  },

  container: {
    height: 80,
    bottom: 0,
    borderTopColor: COLOR.BASE_LIGHTEN,
    borderTopWidth: 1,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    width: '100%',
    zIndex: 1,
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACE.XS,
  },
});
