import { StyleSheet } from 'react-native';

import { THEME } from 'reactor/common';

const {
  COLOR, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: OFFSET,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  key: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: UNIT * 10.6,
    height: UNIT * 5.6,
  },

  number: {
    color: COLOR.WHITE,
  },
});
