import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { OPACITY, SPACE, UNIT } = THEME;

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

  disabled: {
    opacity: OPACITY.L,
  },

  flag: {
    height: SPACE.M,
    width: SPACE.M,
  },

  switch: {
    padding: SPACE.S,
    marginRight: SPACE.S,
  },
});
