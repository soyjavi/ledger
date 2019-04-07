import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE } = C;
const { COLOR, SPACE, UNIT } = THEME;

export default StyleSheet.create({
  card: {
    ...STYLE.CARD,
    backgroundColor: COLOR.BASE,
    flex: 1,
    justifyContent: 'space-between',
    marginRight: SPACE.MEDIUM,
    paddingVertical: SPACE.MEDIUM,
  },

  cardCaption: {
    marginTop: SPACE.XXS,
  },

  cardLast: {
    marginRight: 0,
  },

  cards: {
    paddingHorizontal: SPACE.MEDIUM,
  },

  container: {
    backgroundColor: COLOR.WHITE,
    marginBottom: SPACE.MEDIUM,
    paddingVertical: SPACE.REGULAR,
    borderBottomColor: COLOR.BASE,
    borderBottomWidth: 1,
  },

  content: {
    paddingHorizontal: SPACE.MEDIUM,
    marginBottom: SPACE.MEDIUM,
  },

  logo: {
    height: UNIT * 1.6,
    width: UNIT * 2.2,
    marginRight: UNIT / 2,
    marginBottom: UNIT * 0.4,
  },

  row: LAYOUT.STYLE.ROW,
});
