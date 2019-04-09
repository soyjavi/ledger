import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  scroll: {
    paddingVertical: HEADER_HEIGHT,
  },

  vaults: {
    ...LAYOUT.STYLE.ROW,
    flexWrap: 'wrap',
  },
});
