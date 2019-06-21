import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { UNIT, SPACE } = THEME;
const { STYLE: { HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  button: {
    marginRight: SPACE.XS,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    height: HEADER_HEIGHT,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 2,
  },

  content: {
    flex: 1,
  },

  logo: {
    height: UNIT * 1.6,
    width: UNIT * 2.2,
    marginRight: SPACE.XXS,
  },

  row: LAYOUT.STYLE.ROW,
});
