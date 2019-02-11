import { StyleSheet } from 'react-native';

import { LAYOUT } from '../../reactor/common';

export default StyleSheet.create({
  heading: {
    ...LAYOUT.STYLE.ROW,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
