import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { SPACE } = THEME;
const { STYLE } = C;

export default StyleSheet.create({
  buttonBack: {
    marginRight: SPACE.S,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    bottom: 0,
    justifyContent: 'flex-end',
    height: STYLE.FOOTER_HEIGHT,
    paddingHorizontal: SPACE.MEDIUM,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    width: '100%',
    zIndex: 2,
  },
});
