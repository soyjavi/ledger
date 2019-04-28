import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE } = C;

const { COLOR, SPACE, UNIT } = THEME;

const THUMBNAIL_SIZE = UNIT * 3.2;

export default StyleSheet.create({
  container: {
    ...STYLE.CARD,
    alignItems: 'center',
    backgroundColor: COLOR.BASE,
    marginRight: SPACE.S,
  },

  icon: {
    opacity: 0.66,
  },

  image: {
    height: THUMBNAIL_SIZE,
    width: THUMBNAIL_SIZE,
  },

  thumbnail: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: THUMBNAIL_SIZE / 2,
    height: THUMBNAIL_SIZE,
    justifyContent: 'center',
    marginBottom: SPACE.XS,
    width: THUMBNAIL_SIZE,
  },

  thumbnailHighlight: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  title: {
    textAlign: 'center',

  },

  titleHighlight: {
    color: COLOR.WHITE,
  },
});
