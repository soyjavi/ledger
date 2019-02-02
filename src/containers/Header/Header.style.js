import { Platform, StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { COLOR, FONT, UNIT } = THEME;
const { STYLE: { HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    height: HEADER_HEIGHT,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 2,
  },

  content: {
    flex: 1,
  },

  input: {
    ...LAYOUT.STYLE.SHADOW,
    ...FONT.HEADLINE,
    backgroundColor: COLOR.WHITE,
    borderRadius: UNIT * 2.2,
    borderWidth: 0,
    color: COLOR.TEXT,
    height: UNIT * 4.4,
    paddingHorizontal: UNIT * 2,
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
