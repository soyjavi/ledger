import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const { SPACE, UNIT } = THEME;
const IMAGE_SIZE = UNIT * 2.2;

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

  disabled: {
    opacity: 0.38,
  },

  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    margin: SPACE.XS,
  },

  imageDisabled: {
    // opacity: 0.38,
  },

  row: LAYOUT.STYLE.ROW,

  switch: {
    padding: SPACE.XXS,
  },
});
