import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { COLOR } = THEME;
const { STYLE: { HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    height: HEADER_HEIGHT,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  content: {
    flex: 1,
  },

  icon: {
    opacity: 0.5,
  },

  option: {
    ...LAYOUT.STYLE.CENTERED,
    alignItems: 'center',
    height: HEADER_HEIGHT,
    width: HEADER_HEIGHT,
  },

  progressBar: {
    position: 'absolute',
    top: 0,
  },

  title: {
    flex: 1,
    textAlign: 'center',
  },
});
