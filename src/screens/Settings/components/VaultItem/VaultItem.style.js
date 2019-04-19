import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const { UNIT, SPACE } = THEME;
const THUMBNAIL_SIZE = UNIT * 3.2;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    paddingHorizontal: SPACE.MEDIUM,
    paddingVertical: SPACE.XS,
  },

  content: {
    marginHorizontal: SPACE.S,
    flex: 1,
  },

  switch: {
    marginBottom: 0,
  },

  thumbnail: {
    borderRadius: THUMBNAIL_SIZE / 2,
    height: THUMBNAIL_SIZE,
    marginBottom: SPACE.XXS,
    width: THUMBNAIL_SIZE,
  },
});
