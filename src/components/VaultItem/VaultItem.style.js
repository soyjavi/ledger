import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from 'reactor/common';

const { OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    // ...LAYOUT.STYLE.ROW,
    paddingHorizontal: OFFSET,
    paddingVertical: UNIT,
    backgroundColor: 'grey',
    width: '40%',
    marginBottom: OFFSET,
  },

  texts: {
    flex: 1,
    paddingHorizontal: OFFSET / 2,
  },
});
