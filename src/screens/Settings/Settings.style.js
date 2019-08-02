import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { BORDER_RADIUS, COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    paddingVertical: HEADER_HEIGHT,
  },

  frame: {
    alignItems: 'center',
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    margin: SPACE.MEDIUM,
    padding: SPACE.REGULAR,
  },
});
