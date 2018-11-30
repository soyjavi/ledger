import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT, NOTCH_HEIGHT, SLIDER_MONTHS_HEIGHT } } = C;
const { COLOR, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND_OPACITY,
    height: SLIDER_MONTHS_HEIGHT,
    position: 'absolute',
    top: HEADER_HEIGHT + NOTCH_HEIGHT - UNIT,
    width: '100%',
    zIndex: 1,
    backgroundColor: 'yellow',
  },

  item: {
    lineHeight: SLIDER_MONTHS_HEIGHT,
    textAlign: 'center',
    width: LAYOUT.VIEWPORT.W / 3,
  },
});
