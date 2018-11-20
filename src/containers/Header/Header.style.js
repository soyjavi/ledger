import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { COLOR } = THEME;
const { STYLE: { HEADER_HEIGHT, NOTCH_HEIGHT } } = C;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    height: HEADER_HEIGHT,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    top: NOTCH_HEIGHT,
    width: '100%',
    zIndex: 1,
  },

  title: {
    flex: 1,
    textAlign: 'center',
  },
});
