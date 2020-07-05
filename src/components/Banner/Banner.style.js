import { StyleSheet } from 'react-native';
import { LAYOUT, THEME } from 'reactor/common';

const { SPACE } = THEME;

const {
  VIEWPORT: { H },
} = LAYOUT;

let IMAGE_HEIGHT = H / 4;
if (IMAGE_HEIGHT > 512) IMAGE_HEIGHT = 512;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  image: {
    height: IMAGE_HEIGHT,
    width: '75%',
  },

  left: {
    alignItems: 'flex-start',
  },

  right: {
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },

  text: {
    textAlign: 'center',
    // maxWidth: '75%',
    // width: '100%',
  },

  textleft: {
    textAlign: 'left',
    marginRight: SPACE.XXL + SPACE.M,
  },

  textright: {
    textAlign: 'right',
    marginLeft: SPACE.XXL + SPACE.M,
  },

  caption: {
    // @TODO
    fontSize: 14,
    lineHeight: 14 * 1.5,
  },
});
