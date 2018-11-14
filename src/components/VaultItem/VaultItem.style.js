import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  bullet: {
    top: OFFSET / 2,
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT / 2,
    backgroundColor: COLOR.BASE,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-start',
    paddingHorizontal: OFFSET,
    paddingTop: OFFSET,
    // marginBottom: UNIT,
  },

  content: {
    marginHorizontal: UNIT,
    flex: 1,
    borderBottomColor: COLOR.BASE,
    borderBottomWidth: 1,
  },

  summary: {
    ...LAYOUT.STYLE.ROW,
    paddingTop: OFFSET / 2,
    paddingBottom: OFFSET,
  },

  texts: {
    flex: 1,
  },
});
