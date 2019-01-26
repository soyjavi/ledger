import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const {
  COLOR, OFFSET, UNIT,
} = THEME;

const ITEM_HEIGHT = UNIT * 4.4;
const GAUGE_HEIGHT = UNIT * 2.8;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderRadius: ITEM_HEIGHT / 2,
    bottom: 0,
    left: 0,
    minWidth: ITEM_HEIGHT,
    top: 0,
    position: 'absolute',
    zIndex: -1,
  },

  container: {
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    height: ITEM_HEIGHT,
    padding: OFFSET / 2,
  },

  contentExtended: {
    // height: ITEM_HEIGHT * 0.8,
    marginBottom: OFFSET / 4,
  },

  gauge: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: GAUGE_HEIGHT / 2,
    height: GAUGE_HEIGHT,
    marginRight: UNIT,
    width: GAUGE_HEIGHT,
  },

  price: {
    position: 'absolute',
    right: 0,
  },

  text: {
    flex: 1,
  },

  touchable: {
    marginBottom: OFFSET / 4,
  },
});
