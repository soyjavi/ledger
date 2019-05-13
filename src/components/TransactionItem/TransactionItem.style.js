import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;

const ICON_SIZE = UNIT * 3.6;
const DATE_FONT_SIZE = UNIT * 1.6;
const MONTH_FONT_SIZE = UNIT * 0.9;

export default StyleSheet.create({
  container: {
    paddingVertical: OFFSET / 1.5,
    paddingHorizontal: OFFSET,
  },

  containerHighlight: {
    backgroundColor: COLOR.BASE,
  },

  content: {
    alignItems: 'flex-start',
    flex: 1,
  },

  date: {
    fontSize: DATE_FONT_SIZE,
    lineHeight: DATE_FONT_SIZE,
  },

  icon: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BASE,
    borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    justifyContent: 'center',
    marginRight: UNIT,
    width: ICON_SIZE,
  },

  month: {
    fontSize: MONTH_FONT_SIZE,
    lineHeight: MONTH_FONT_SIZE,
  },

  prices: {
    alignItems: 'flex-end',
  },

  row: LAYOUT.STYLE.ROW,

  texts: {
    flex: 1,
  },
});
