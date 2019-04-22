import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const {
  COLOR, UNIT, SPACE,
} = THEME;
const COLUMN_WIDTH = UNIT;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderRadius: COLUMN_WIDTH / 2,
    height: COLUMN_WIDTH,
    minWidth: COLUMN_WIDTH,
  },

  barContainer: {
    marginVertical: SPACE.XXS,
  },

  container: {
    marginTop: SPACE.XXS,
    marginBottom: SPACE.S,
  },

  content: {
    paddingVertical: SPACE.XXS,
    paddingHorizontal: SPACE.MEDIUM,
  },

  row: LAYOUT.STYLE.ROW,

  title: {
    flex: 1,
  },
});
