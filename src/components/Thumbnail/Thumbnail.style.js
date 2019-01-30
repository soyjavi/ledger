import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { THUMBNAIL_SIZE } } = C;
const { COLOR } = THEME;

export default StyleSheet.create({
  caption: {
    opacity: 0.5,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: THUMBNAIL_SIZE / 2,
    height: THUMBNAIL_SIZE,
    justifyContent: 'center',
    width: THUMBNAIL_SIZE,
    zIndex: 1,
  },

  icon: {
    height: THUMBNAIL_SIZE / 2,
    width: THUMBNAIL_SIZE / 2,
  },

  text: {
    color: COLOR.WHITE,
  },
});
