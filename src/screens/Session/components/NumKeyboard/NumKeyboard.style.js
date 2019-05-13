import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { OFFSET, UNIT } = THEME;
const KEY_HEIGHT = UNIT * 5.6;

export { KEY_HEIGHT };

export default StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    bottom: OFFSET,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  touchable: {
    alignItems: 'center',
    alignContent: 'center',
    height: KEY_HEIGHT,
    justifyContent: 'center',
    minWidth: UNIT * 10,
  },

  key: {
    fontSize: UNIT * 2.4,
  },
});
