import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { OPACITY, SPACE, UNIT } = THEME;
const IMAGE_SIZE = UNIT * 1.6;

export default StyleSheet.create({
  balance: {
    marginRight: SPACE.XXS,
  },

  boxContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    paddingHorizontal: SPACE.M,
    paddingVertical: SPACE.XS,
    flex: 1,
  },

  content: {
    flex: 1,
    marginLeft: UNIT,
  },

  disabled: {
    opacity: OPACITY.L,
  },

  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },

  switch: {
    padding: SPACE.S,
    marginRight: SPACE.S,
  },
});
