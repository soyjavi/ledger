import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT, SPACE } = THEME;
const IMAGE_SIZE = UNIT * 1.8;

export default StyleSheet.create({
  breakline: {
    backgroundColor: COLOR.BASE,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    marginHorizontal: SPACE.MEDIUM,
    marginVertical: SPACE.XXS,
  },

  content: {
    flex: 1,
  },

  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    marginRight: SPACE.XXS,
  },
});
