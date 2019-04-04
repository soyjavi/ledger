import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { CARD, HEADER_HEIGHT } } = C;
const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  card: {
    ...CARD,
    backgroundColor: COLOR.BASE,
    marginBottom: SPACE.MEDIUM,
  },

  cardGap: {
    marginRight: SPACE.MEDIUM,
  },

  cardLarge: {
    width: '100%',
  },

  cardSmall: {
    width: (LAYOUT.VIEWPORT.W / 2) - (SPACE.MEDIUM * 1.5),
  },

  container: {
    paddingBottom: HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT,
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    marginTop: SPACE.MEDIUM,
    flexWrap: 'wrap',
    paddingHorizontal: SPACE.MEDIUM,
  },

  slider: {
    marginVertical: SPACE.MEDIUM,
    paddingRight: SPACE.XXS,
  },
});
