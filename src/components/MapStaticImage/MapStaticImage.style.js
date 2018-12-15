import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { COLOR, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BASE,
    height: UNIT * 12.8,
    width: '100%',
  },
});
