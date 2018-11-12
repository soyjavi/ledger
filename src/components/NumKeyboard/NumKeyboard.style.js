import { StyleSheet } from 'react-native';

import { THEME } from 'reactor/common';

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
    minWidth: UNIT * 5.6,
    width: '33%',
  },

  key: {
    fontSize: UNIT * 2.4,
  },
});
