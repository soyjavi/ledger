import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { SPACE, UNIT } = THEME;
const FLAG_SIZE = UNIT * 1.6;

export default StyleSheet.create({
  caption: {
    marginVertical: SPACE.XXS,
    marginHorizontal: SPACE.MEDIUM,
  },

  container: {
    paddingVertical: HEADER_HEIGHT,
  },

  horizontalChart: {
    marginHorizontal: SPACE.MEDIUM,
  },

  optionFlag: {
    borderRadius: FLAG_SIZE / 2,
    height: FLAG_SIZE,
    width: FLAG_SIZE,
    marginBottom: SPACE.XXS / 2,
    marginRight: SPACE.XXS,
  },

  row: LAYOUT.STYLE.ROW,

  vaults: {
    marginBottom: SPACE.MEDIUM,
  },
});
