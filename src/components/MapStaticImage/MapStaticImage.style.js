import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { BORDER_RADIUS, COLOR, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    height: UNIT * 12.8,
    width: '100%',
  },
});
