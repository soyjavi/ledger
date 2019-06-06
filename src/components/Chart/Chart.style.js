import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const {
  COLOR, FONT, UNIT, SPACE,
} = THEME;

const COLUMN_HEIGHT = UNIT * 6.4;
const COLUMN_WIDTH = UNIT * 1;
const SCALE_WIDTH = SPACE.XL;

export default StyleSheet.create({
  caption: {
    fontSize: UNIT,
    height: UNIT,
    lineHeight: UNIT,
  },

  captionHighlight: {
    color: COLOR.WHITE,
    fontWeight: FONT.WEIGHT.BOLD,
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

  container: {
    marginTop: SPACE.XS,
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    flex: 1,
    height: COLUMN_HEIGHT,
  },

  bar: {
    backgroundColor: COLOR.BASE,
    borderTopLeftRadius: COLUMN_WIDTH / 2,
    borderTopRightRadius: COLUMN_WIDTH / 2,
    maxHeight: '100%',
    minHeight: COLUMN_WIDTH,
    width: COLUMN_WIDTH,
  },

  barEmpty: {
    backgroundColor: COLOR.BASE,
    opacity: 0.8,
  },

  barInverted: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: COLUMN_WIDTH / 2,
    borderBottomRightRadius: COLUMN_WIDTH / 2,
  },

  row: {
    ...LAYOUT.STYLE.ROW,
    justifyContent: 'space-between',
  },

  rowScale: {
    marginLeft: SCALE_WIDTH,
  },

  scale: {
    ...LAYOUT.STYLE.ROW,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  scaleCaptions: {
    bottom: SPACE.REGULAR,
  },

  scaleLines: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    opacity: 0.66,
  },

  scaleLine: {
    height: 1,
    width: '100%',
    backgroundColor: COLOR.BASE,
  },

  scaleLineEmpty: {
    height: 0,
  },

  scaleValues: {
    position: 'absolute',
    bottom: SPACE.XS,
    justifyContent: 'space-between',
    top: -SPACE.S,
    width: SCALE_WIDTH,
  },
});
