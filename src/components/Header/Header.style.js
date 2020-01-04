import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { SPACE } = THEME;
const {
  STYLE: { HEADER_HEIGHT },
} = C;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    height: HEADER_HEIGHT,
    paddingRight: SPACE.XXS,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    zIndex: 2,
  },

  content: {
    flex: 1,
  },
});
