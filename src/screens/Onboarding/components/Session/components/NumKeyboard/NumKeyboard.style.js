import { StyleSheet } from 'react-native';
import { LAYOUT, THEME } from 'reactor/common';

const { UNIT, SPACE } = THEME;

const KEY_HEIGHT = UNIT * 8;
const KEY_WIDTH = LAYOUT.VIEWPORT.W / 3 - SPACE.M * 2;

export default StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: SPACE.XS,
  },

  content: {
    alignItems: 'center',
    alignContent: 'center',
    height: KEY_HEIGHT,
    justifyContent: 'center',
  },

  touchable: {
    margin: SPACE.XS,
    width: KEY_WIDTH,
    height: KEY_HEIGHT,
  },
});
