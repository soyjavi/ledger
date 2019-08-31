import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE } = C;
const {
  BORDER_RADIUS, COLOR, SPACE, UNIT,
} = THEME;

export default StyleSheet.create({
  expand: {
    flex: 1,
  },

  card: {
    ...STYLE.CARD,
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    flex: 1,
  },

  container: {
    justifyContent: 'flex-start',
    minHeight: UNIT * 16,
    marginBottom: SPACE.S,
    marginHorizontal: SPACE.MEDIUM,
  },

  image: {
    height: UNIT * 1.4,
    width: UNIT * 1.4,
    marginRight: SPACE.XXS,
  },

  row: LAYOUT.STYLE.ROW,

  rowHeading: {
    marginVertical: -SPACE.XXS,
  },

  rowItem: {
    marginRight: SPACE.MEDIUM,
  },

  rowItemExpanded: {
    flex: 2,
  },
});
