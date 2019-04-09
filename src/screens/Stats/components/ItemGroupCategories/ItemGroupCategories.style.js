import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const {
  COLOR, UNIT, SPACE,
} = THEME;
const COLUMN_WIDTH = UNIT * 1;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.PRIMARY,
    borderTopRightRadius: COLUMN_WIDTH / 2,
    borderBottomRightRadius: COLUMN_WIDTH / 2,
    height: COLUMN_WIDTH,
    minWidth: COLUMN_WIDTH,
  },

  container: {
    marginBottom: SPACE.REGULAR,
  },

  content: {
    paddingTop: SPACE.XXS,
    paddingHorizontal: SPACE.MEDIUM,
  },

  heading: {
    flex: 1,
    alignItems: 'flex-end',
  },

  row: LAYOUT.STYLE.ROW,

  title: {
    flex: 1,
  },
});
