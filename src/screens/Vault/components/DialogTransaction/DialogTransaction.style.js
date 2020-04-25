import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { UNIT } = THEME;
const CARD_WIDTH = UNIT * 9.6;

export { CARD_WIDTH };

export default StyleSheet.create({
  card: {
    minHeight: CARD_WIDTH,
    width: CARD_WIDTH,
  },
});
