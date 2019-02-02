import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { BORDER_RADIUS, COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLOR.BASE,
    maxWidth: (LAYOUT.VIEWPORT.W / 2) - (OFFSET * 1.5),
    margin: OFFSET / 2,
    overflow: 'hidden',
    padding: OFFSET,
    width: '100%',
    // height: UNIT * 12,
  },

  content: {
    flex: 1,
    marginHorizontal: OFFSET,
  },

  progression: {
    borderTopColor: COLOR.BASE,
    borderTopWidth: 1,
    marginTop: OFFSET / 2,
    paddingTop: OFFSET / 2,
  },

  row: LAYOUT.STYLE.ROW,

  separator: {
    flex: 1,
  },
});
