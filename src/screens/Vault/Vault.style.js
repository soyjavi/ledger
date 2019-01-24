import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT, BALANCE_CARD_HEIGHT } } = C;
const { OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    paddingBottom: HEADER_HEIGHT,
    paddingTop: BALANCE_CARD_HEIGHT + HEADER_HEIGHT,
  },

  content: {
    ...LAYOUT.STYLE.CENTERED,
    padding: OFFSET,
  },
});
