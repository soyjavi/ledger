import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BAR_SIZE, BORDER_RADIUS, COLOR, OPACITY, SPACE } = THEME;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    maxHeight: '100%',
    minHeight: BAR_SIZE,
    width: BAR_SIZE,
  },

  barInverted: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
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
    height: BAR_SIZE * 10,
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
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SPACE.XS,
    borderWidth: 1,
    borderColor: COLOR.BACKGROUND,
    zIndex: 1,
  },
});
