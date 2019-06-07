import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE } = C;
const {
  BORDER_RADIUS, COLOR, SPACE, UNIT,
} = THEME;

export default StyleSheet.create({
  card: {
    ...STYLE.CARD,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLOR.BASE,
    flex: 1,
    justifyContent: 'space-between',
    marginRight: SPACE.S,
  },

  cardLast: {
    marginRight: 0,
  },

  cards: {
    paddingHorizontal: SPACE.MEDIUM,
  },

  container: {
    paddingBottom: SPACE.MEDIUM,
  },

  content: {
    paddingHorizontal: SPACE.MEDIUM,
    marginBottom: SPACE.MEDIUM,
  },

  image: {
    height: UNIT * 1.6,
    width: UNIT * 1.6,
    marginRight: SPACE.XXS,
  },

  row: LAYOUT.STYLE.ROW,
});
