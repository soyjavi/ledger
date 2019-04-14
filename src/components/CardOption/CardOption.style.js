import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE } = C;

const { COLOR, SPACE, UNIT } = THEME;

const IMAGE_SIZE = UNIT * 3.2;

export default StyleSheet.create({
  container: {
    ...STYLE.CARD,
    paddingHorizontal: 0,
    alignItems: 'center',
    backgroundColor: COLOR.BASE,
    width: 96,
    marginRight: SPACE.S,
  },

  selected: {
    backgroundColor: COLOR.PRIMARY,
  },

  title: {
    textAlign: 'center',
  },

  titleHighlight: {
    color: COLOR.WHITE,
  },

  image: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: IMAGE_SIZE / 2,
    height: IMAGE_SIZE,
    marginBottom: SPACE.XS,
    width: IMAGE_SIZE,
  },
});
