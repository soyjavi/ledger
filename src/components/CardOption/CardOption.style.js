import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { BORDER_RADIUS, SPACE, UNIT } = THEME;
const THUMBNAIL_SIZE = UNIT * 1.8;
const ICON_SIZE = UNIT * 2.8;

export default StyleSheet.create({
  box: {
    marginRight: SPACE.S,
  },

  container: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
    paddingVertical: SPACE.MEDIUM,
  },

  image: {
    height: THUMBNAIL_SIZE,
    marginBottom: SPACE.XXS,
    width: THUMBNAIL_SIZE,
  },

  icon: {
    alignItems: 'center',
    height: ICON_SIZE,
    justifyContent: 'center',
    marginBottom: SPACE.XS,
    width: ICON_SIZE,
  },

  title: {
    textAlign: 'center',
    paddingHorizontal: SPACE.XS,
  },
});
