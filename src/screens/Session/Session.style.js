import { StyleSheet } from 'react-native';

import { THEME } from 'reactor/common';

const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  content: {
    padding: OFFSET,
    paddingTop: '50%',
    backgroundColor: COLOR.PRIMARY,
    width: '100%',
    height: '100%',
  },

  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
  },

  text: {
    color: COLOR.WHITE,
    alignSelf: 'center',
  },
});
