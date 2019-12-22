import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { BORDER_RADIUS, SPACE, UNIT } = THEME;
const THUMBNAIL_SIZE = UNIT * 3.2;

export default StyleSheet.create({
  box: {
    marginRight: SPACE.S,
  },

  container: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
    paddingVertical: SPACE.MEDIUM,
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: THUMBNAIL_SIZE / 2,
    height: THUMBNAIL_SIZE,
    justifyContent: 'center',
    marginBottom: SPACE.XS,
    width: THUMBNAIL_SIZE,
  },

  title: {
    textAlign: 'center',
    paddingHorizontal: SPACE.XS,
  },
});
