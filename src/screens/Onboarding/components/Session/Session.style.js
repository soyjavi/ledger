import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  bullet: {
    borderRadius: SPACE.M / 2,
    height: SPACE.M,
    marginHorizontal: SPACE.XS,
    marginVertical: SPACE.L,
    width: SPACE.M,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    paddingHorizontal: SPACE.M,
  },
});
