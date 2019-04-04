import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { CARD, HEADER_HEIGHT } } = C;
const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  scroll: {
    paddingBottom: HEADER_HEIGHT,
  },

  slider: {
    marginVertical: SPACE.MEDIUM,
    paddingRight: SPACE.XXS,
  },

  card: {
    ...CARD,
    backgroundColor: COLOR.BASE,
    flex: 1,
    marginLeft: SPACE.MEDIUM,
  },
});
