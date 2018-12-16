import { Platform, StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { COLOR, FONT, UNIT } = THEME;
const { STYLE: { HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    height: HEADER_HEIGHT,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 2,
  },

  content: {
    flex: 1,
    backgroundColor: 'rgba(0,255,0,0.25)',
  },

  input: {
    ...FONT.HEADLINE,
    backgroundColor: COLOR.WHITE,
    borderWidth: 0,
    color: COLOR.TEXT,
    fontSize: UNIT * 2,
    height: UNIT * 4,
    paddingHorizontal: UNIT * 0.5,
    width: '100%',
    ...Platform.select({
      web: {
        outline: 'none',
      },
    }),
  },

  title: {
    textAlign: 'center',
  },
});
