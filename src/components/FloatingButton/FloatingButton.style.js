import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const {
  COLOR, ELEVATION, UNIT, OFFSET,
} = THEME;
const CONTAINER_SIZE = UNIT * 5.6;

export { CONTAINER_SIZE };

export default StyleSheet.create({
  button: {
    ...ELEVATION.REGULAR,
    ...LAYOUT.STYLE.CENTERED,
    backgroundColor: COLOR.TEXT,
    borderRadius: CONTAINER_SIZE / 2,
    height: CONTAINER_SIZE,
    width: CONTAINER_SIZE,
  },

  buttonOpened: {
    ...ELEVATION.SMALL,
    transform: [{ rotate: '45deg' }],
  },

  bullet: {
    backgroundColor: COLOR.BASE,
    borderRadius: UNIT / 2,
    height: UNIT,
    marginLeft: UNIT / 2,
    width: UNIT,
  },

  income: {
    backgroundColor: COLOR.INCOMES,
  },

  expense: {
    backgroundColor: COLOR.EXPENSES,
  },

  transfer: {
    backgroundColor: COLOR.ACCENT,
  },

  container: {
    alignItems: 'flex-end',
    bottom: OFFSET,
    position: 'absolute',
    right: OFFSET,
    zIndex: 1,
  },

  icon: {
    height: CONTAINER_SIZE / 2,
    width: CONTAINER_SIZE / 2,
  },

  options: {
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
    marginRight: UNIT,
  },

  option: {
    ...ELEVATION.SMALL,
    ...LAYOUT.STYLE.ROW,

    height: UNIT * 3,
    backgroundColor: COLOR.BACKGROUND,
    borderRadius: UNIT * 2,
    marginVertical: OFFSET / 2,
    paddingHorizontal: UNIT,
    paddingVertical: UNIT / 2,
  },
});
