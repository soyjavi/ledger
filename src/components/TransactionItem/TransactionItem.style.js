import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { UNIT } = THEME;

export default StyleSheet.create({
  box: {
    marginRight: UNIT,
  },

  boxContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
