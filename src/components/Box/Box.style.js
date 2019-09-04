import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { BORDER_RADIUS, COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    height: '100%',
    overflow: 'hidden',
    padding: SPACE.MEDIUM,
    width: '100%',
  },
});
