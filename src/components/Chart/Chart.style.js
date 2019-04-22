import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT, SPACE } = THEME;

const COLUMN_HEIGHT = UNIT * 6.4;
const COLUMN_WIDTH = UNIT * 1;
const SCALE_WIDTH = SPACE.XL;

export default StyleSheet.create({
  caption: {
    fontSize: UNIT,
    lineHeight: UNIT,
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

  inverted: {
    justifyContent: 'flex-start',
  },

  container: {
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    flex: 1,
    height: COLUMN_HEIGHT,
  },

  item: {
    borderTopLeftRadius: COLUMN_WIDTH / 2,
    borderTopRightRadius: COLUMN_WIDTH / 2,
    maxHeight: '100%',
    minHeight: COLUMN_WIDTH,
    width: COLUMN_WIDTH,
  },

  itemInverted: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: COLUMN_WIDTH / 2,
    borderBottomRightRadius: COLUMN_WIDTH / 2,
  },

  row: {
    ...LAYOUT.STYLE.ROW,
    // flex: 1,
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
    display: 'flex',
  },

  scaleCaptions: {
    bottom: SPACE.REGULAR,
  },

  scaleLines: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
  },

  scaleLine: {
    height: 1,
    width: '100%',
    backgroundColor: COLOR.BASE,
  },

  scaleValues: {
    justifyContent: 'space-between',
    width: SCALE_WIDTH,
    height: '100%',
  },
});
