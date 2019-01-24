import { StyleSheet } from 'react-native';

import { C } from '../../common';

const { STYLE: { HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  container: {
    left: 0,
    position: 'absolute',
    top: HEADER_HEIGHT,
    right: 0,
  },
});
