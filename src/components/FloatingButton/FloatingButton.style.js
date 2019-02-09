import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT, OFFSET } = THEME;
const CONTAINER_SIZE = UNIT * 5.6;

export { CONTAINER_SIZE };

export default StyleSheet.create({
  button: {
    ...LAYOUT.STYLE.SHADOW,
    ...LAYOUT.STYLE.CENTERED,
    backgroundColor: COLOR.PRIMARY,
    borderRadius: CONTAINER_SIZE / 2,
    height: CONTAINER_SIZE,
    width: CONTAINER_SIZE,
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
    backgroundColor: COLOR.PRIMARY,
  },

  container: {
    alignItems: 'flex-end',
    bottom: OFFSET,
    position: 'absolute',
    right: OFFSET,
    zIndex: 1,
  },
  buttonOpened: {
    transform: [{ rotate: '45deg' }],
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
