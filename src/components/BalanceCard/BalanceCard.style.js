import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE } = C;
const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  alignRight: {
    textAlign: 'right',
  },

  card: {
    ...STYLE.CARD,
    marginTop: OFFSET,
    backgroundColor: COLOR.BASE,
    minHeight: 0,
    flex: 1,
  },

  cardDisabled: {
    opacity: 0.33,
  },

  cardLeft: {
    marginRight: OFFSET,
  },

  cardMiddle: {
    marginHorizontal: OFFSET,
  },

  container: {
    marginTop: OFFSET,
    zIndex: 1,
  },

  row: LAYOUT.STYLE.ROW,

  section: {
    marginHorizontal: OFFSET,
    marginBottom: OFFSET,
  },

  summary: {
    alignItems: 'flex-start',
    marginBottom: OFFSET,
  },

  separator: {
    flex: 1,
  },
});
