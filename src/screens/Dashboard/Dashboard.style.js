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

  row: {
    ...LAYOUT.STYLE.ROW,
    marginHorizontal: OFFSET,
    marginVertical: OFFSET / 2,
  },

  scroll: {
    paddingBottom: HEADER_HEIGHT,
  },

  subtitle: {
    flex: 1,
  },

  vaults: {
    display: 'flex',
    // flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    marginHorizontal: OFFSET / 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
