import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE } = C;
const {
  BORDER_RADIUS, COLOR, SPACE, UNIT,
} = THEME;

export default StyleSheet.create({
  breakLine: {
    flex: 1,
  },

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
    marginBottom: SPACE.XS,
  },

  content: {
    justifyContent: 'flex-start',
    minHeight: UNIT * 16,
    marginBottom: SPACE.XS,
    marginHorizontal: SPACE.MEDIUM,
  },

  image: {
    height: UNIT * 1.4,
    width: UNIT * 1.4,
    marginRight: SPACE.XXS,
  },

  row: LAYOUT.STYLE.ROW,

  title: {
    // marginBottom: SPACE.XXS / 2,
  },
});
