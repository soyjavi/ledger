import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, FONT, UNIT, SPACE } = THEME;

const COLUMN_HEIGHT = UNIT * 6.4;
const COLUMN_WIDTH = UNIT * 1;
const COLUMN_BORDER = 0;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderTopLeftRadius: COLUMN_BORDER,
    borderTopRightRadius: COLUMN_BORDER,
    maxHeight: '100%',
    minHeight: COLUMN_WIDTH,
    width: COLUMN_WIDTH,
  },

  barInverted: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: COLUMN_BORDER,
    borderBottomRightRadius: COLUMN_BORDER,
  },

  captions: {
    position: 'absolute',
    height: SPACE.MEDIUM,
    bottom: -SPACE.MEDIUM,
    width: '100%',
  },

  column: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  columnInverted: {
    justifyContent: 'flex-start',
  },

  container: {
    borderColor: COLOR.BASE,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },

  containerInverted: {
    borderTopWidth: 0,
    marginTop: -1,
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    flex: 1,
    height: COLUMN_HEIGHT,
  },

  heading: {
    marginHorizontal: 0,
  },

  legend: {
    fontSize: UNIT,
    height: UNIT,
    lineHeight: UNIT,
  },

  legendHighlight: {
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  row: {
    ...LAYOUT.STYLE.ROW,
    justifyContent: 'space-between',
  },

  scales: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },

  scaleAvg: {
    marginTop: -UNIT,
    top: '100%',
  },

  scaleLine: {
    backgroundColor: COLOR.BASE,
    height: 1,
    opacity: 0.31,
    width: '100%',
    top: '50%',
  },

  tag: {
    display: 'flex',
    alignSelf: 'flex-start',
    borderRadius: SPACE.S,
    height: SPACE.MEDIUM,
    justifyContent: 'center',
    paddingHorizontal: SPACE.XS,
  },
});
