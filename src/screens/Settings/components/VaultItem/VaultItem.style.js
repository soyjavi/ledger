import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const { UNIT, SPACE } = THEME;
const THUMBNAIL_SIZE = UNIT * 1.6;

export default StyleSheet.create({
  container: {
    paddingHorizontal: SPACE.MEDIUM,
    paddingVertical: SPACE.XS,
  },

  content: {
    flex: 1,
  },

  row: LAYOUT.STYLE.ROW,

  switch: {
    marginBottom: 0,
  },

  thumbnail: {
    borderRadius: THUMBNAIL_SIZE / 2,
    height: THUMBNAIL_SIZE,
    width: THUMBNAIL_SIZE,
    marginBottom: SPACE.XXS / 2,
    marginRight: SPACE.XXS,
  },
});
