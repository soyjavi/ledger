import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const {
  COLOR, FONT, UNIT, SPACE,
} = THEME;

const COLUMN_HEIGHT = UNIT * 6.4;
const COLUMN_WIDTH = UNIT * 1;
const SCALE_WIDTH = SPACE.XL;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderTopLeftRadius: COLUMN_WIDTH / 2,
    borderTopRightRadius: COLUMN_WIDTH / 2,
    maxHeight: '100%',
    minHeight: COLUMN_WIDTH,
    width: COLUMN_WIDTH,
  },

  barEmpty: {
    opacity: 0.8,
  },

  barInverted: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: COLUMN_WIDTH / 2,
    borderBottomRightRadius: COLUMN_WIDTH / 2,
  },

  captions: {
    height: SPACE.REGULAR,
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

  containerInverted: {
    marginTop: -1,
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    flex: 1,
    height: COLUMN_HEIGHT,
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

  rowScale: {
    marginLeft: SCALE_WIDTH,
  },

  scales: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // zIndex: 1,

    // backgroundColor: 'rgba(0,255,0, 0.25)',
    borderColor: COLOR.BASE,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },

  scalesInverted: {
    borderTopWidth: 0,
  },

  scaleCaptions: {
    bottom: SPACE.REGULAR,
  },

  scaleLine: {
    backgroundColor: COLOR.BASE,
    height: 1,
    opacity: 0.38,
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
