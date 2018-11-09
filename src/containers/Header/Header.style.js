import { StyleSheet } from 'react-native';

import { C } from 'common';
import { LAYOUT, ENV, THEME } from 'reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;
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

  option: {
    width: UNIT * 7.2,
    height: HEADER_HEIGHT * 0.8,
    lineHeight: HEADER_HEIGHT * 0.8,
  },

  optionLeft: {
    marginLeft: OFFSET,
    marginRight: UNIT,
  },

  optionRight: {
    marginLeft: UNIT,
    marginRight: OFFSET,
    textAlign: 'right',
  },

  progressBar: {
    position: 'absolute',
    top: 0,
  },

  title: {
    alignItems: 'center',
    flex: 1,
  },
});
