import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { UNIT } = THEME;

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'flex-end',
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
