import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { SPACE } = THEME;

const BULLET_SIZE = SPACE.S + SPACE.XS;
const LOGO_SIZE = SPACE.XXL + SPACE.XL;

export default StyleSheet.create({
  bullet: {
    borderRadius: BULLET_SIZE / 2,
    height: BULLET_SIZE,
    marginHorizontal: BULLET_SIZE,
    marginVertical: SPACE.L,
    width: BULLET_SIZE,
  },

  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    paddingHorizontal: SPACE.M,
  },

  image: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
});
