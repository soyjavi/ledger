import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const { COLOR, SPACE, UNIT } = THEME;
const ICON_CONTAINER_SIZE = UNIT * 2.2;
const ICON_SIZE = UNIT * 1.4;

export default StyleSheet.create({
  balance: {
    marginRight: SPACE.XXS,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    paddingHorizontal: SPACE.MEDIUM,
    paddingVertical: SPACE.XXS,
  },

  content: {
    flex: 1,
    marginLeft: UNIT,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.TEXT,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    height: ICON_CONTAINER_SIZE,
    opacity: 0.2,
    width: ICON_CONTAINER_SIZE,
  },

  iconActive: {
    backgroundColor: COLOR.ACCENT,
    opacity: 1,
  },

  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
  },

  image: {
    height: ICON_CONTAINER_SIZE,
    width: ICON_CONTAINER_SIZE,
    margin: SPACE.XS,
  },

  imageDisabled: {
    opacity: 0.5,
  },

  row: LAYOUT.STYLE.ROW,
});
