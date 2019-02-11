import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { THUMBNAIL_SIZE } } = C;
const { COLOR, UNIT } = THEME;

const HALO_GAP = UNIT * 0.6;

export default StyleSheet.create({
  caption: {
    opacity: 0.5,
  },

  container: {
    zIndex: 1,
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: THUMBNAIL_SIZE / 2,
    height: THUMBNAIL_SIZE,
    justifyContent: 'center',
    width: THUMBNAIL_SIZE,
  },

  halo: {
    borderRadius: (THUMBNAIL_SIZE + HALO_GAP) / 2,
    height: (THUMBNAIL_SIZE + HALO_GAP),
    left: -(HALO_GAP / 2),
    top: -(HALO_GAP / 2),
    opacity: 0.2,
    position: 'absolute',
    width: (THUMBNAIL_SIZE + HALO_GAP),
  },

  icon: {
    height: THUMBNAIL_SIZE / 2,
    width: THUMBNAIL_SIZE / 2,
  },

  text: {
    color: COLOR.WHITE,
  },
});
