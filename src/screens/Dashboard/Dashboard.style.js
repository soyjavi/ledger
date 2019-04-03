import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { CARD, HEADER_HEIGHT } } = C;
const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  scroll: {
    paddingBottom: HEADER_HEIGHT,
  },

  slider: {
    marginVertical: OFFSET,
    paddingRight: OFFSET * 4,
  },

  card: {
    ...CARD,
    backgroundColor: COLOR.BASE,
    flex: 1,
    marginLeft: OFFSET,
  },
});
