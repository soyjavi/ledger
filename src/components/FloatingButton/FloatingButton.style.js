import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT, OFFSET } = THEME;
const CONTAINER_SIZE = UNIT * 5.6;

export default StyleSheet.create({
  container: {
    bottom: OFFSET,
    height: CONTAINER_SIZE,
    position: 'absolute',
    right: OFFSET,
    width: CONTAINER_SIZE,
    zIndex: 1,
  },

  bullet: {
    backgroundColor: COLOR.BASE,
    borderRadius: UNIT / 2,
    height: UNIT,
    marginLeft: UNIT,
    width: UNIT,
  },

  button: {
    ...LAYOUT.STYLE.SHADOW,
    ...LAYOUT.STYLE.CENTERED,
    backgroundColor: COLOR.TEXT,
    borderRadius: CONTAINER_SIZE / 2,
    height: CONTAINER_SIZE,
    width: CONTAINER_SIZE,
  },

  icon: {
    height: CONTAINER_SIZE / 2,
    width: CONTAINER_SIZE / 2,
  },

  motionButton: {
    zIndex: 1,
  },

  opened: {
    transform: [{ rotate: '45deg' }],
  },

  options: {
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
    position: 'absolute',
    right: (CONTAINER_SIZE / 4),
    bottom: CONTAINER_SIZE,
  },

  option: {
    ...LAYOUT.STYLE.SHADOW,
    ...LAYOUT.STYLE.ROW,

    height: UNIT * 3,
    backgroundColor: COLOR.BACKGROUND,
    borderRadius: UNIT * 2,
    marginVertical: OFFSET / 2,
    paddingHorizontal: UNIT,
    paddingVertical: UNIT / 2,
  },
});
