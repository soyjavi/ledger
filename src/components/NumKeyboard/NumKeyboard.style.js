import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    bottom: OFFSET * 2,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  touchable: {
    alignItems: 'center',
    alignContent: 'center',
    height: UNIT * 5.6,
    justifyContent: 'center',
    minWidth: UNIT * 10,
  },

  key: {
    fontSize: UNIT * 2.4,
  },
});
