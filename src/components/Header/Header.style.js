import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const {
  COLOR, ELEVATION, UNIT, SPACE,
} = THEME;
const { STYLE: { HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  button: {
    marginRight: SPACE.XS,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    backgroundColor: COLOR.WHITE,
    height: HEADER_HEIGHT,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 2,
  },

  content: {
    flex: 1,
  },

  highlight: ELEVATION.SMALL,

  logo: {
    height: UNIT * 1.6,
    width: UNIT * 2.2,
    marginRight: SPACE.XXS,
  },

  row: LAYOUT.STYLE.ROW,
});
