import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { THUMBNAIL_SIZE } } = C;
const { COLOR, OFFSET, UNIT } = THEME;

const ITEM_HEIGHT = THUMBNAIL_SIZE + (OFFSET / 3);

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderRadius: ITEM_HEIGHT / 2,
    bottom: 0,
    left: 0,
    minWidth: ITEM_HEIGHT,
    opacity: 0.25,
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },

  container: {
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    paddingLeft: UNIT / 4,
    paddingVertical: UNIT / 4,
  },

  contentExtended: {
    marginBottom: OFFSET / 4,
    opacity: 0.75,
  },

  text: {
    flex: 1,
    marginHorizontal: OFFSET,
  },

  touchable: {
    marginBottom: OFFSET / 4,
  },
});
