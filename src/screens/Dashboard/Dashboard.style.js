import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { OFFSET } = THEME;

const { STYLE: { FOOTER, HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  button: {
    marginLeft: OFFSET,
    flex: 1,
  },

  footer: {
    ...FOOTER,
    ...LAYOUT.STYLE.SHADOW,
    zIndex: -1,
  },

  scroll: {
    paddingBottom: HEADER_HEIGHT,
  },

  subtitle: {
    marginTop: OFFSET,
    marginHorizontal: OFFSET,
  },
});
