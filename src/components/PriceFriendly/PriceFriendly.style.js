import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { FONT, UNIT, SPACE } = THEME;

export default StyleSheet.create({
  font: FONT.PRICE,

  icon: {
    height: UNIT,
    width: UNIT,
    marginRight: SPACE.XXS,
  },
});
