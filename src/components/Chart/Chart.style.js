import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, OPACITY, SPACE } = THEME;
const COLUMN_WIDTH = SPACE.S + SPACE.XS / 2;
const COLUMN_HEIGHT = COLUMN_WIDTH * 8;

const RADIUS = BORDER_RADIUS / 2;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    maxHeight: '100%',
    minHeight: COLUMN_WIDTH / 1.5,
    width: COLUMN_WIDTH,
  },

  barInverted: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
  },

  captions: {
    position: 'absolute',
    height: SPACE.M,
    bottom: -SPACE.M,
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
    flex: 1,
    height: COLUMN_HEIGHT,
  },

  scales: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },

  scaleAvg: {
    marginTop: -(SPACE.M - SPACE.XS),

    top: '100%',
  },

  scaleLine: {
    backgroundColor: COLOR.LIGHTEN,
    height: 1,
    opacity: OPACITY.L,
    width: '100%',
    top: '50%',
  },

  tag: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: SPACE.XS,
    borderWidth: 1,
    borderColor: COLOR.BACKGROUND,
    zIndex: 1,
  },
});
