import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { COLOR, UNIT } = THEME;
const { STYLE: { HEADER_HEIGHT } } = C;

const ICON_SIZE = UNIT * 2.4;

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
    height: ICON_SIZE,
    width: ICON_SIZE,
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
    textAlign: 'center',
  },
});
