import { StyleSheet } from 'react-native';

import { C } from 'common';

const { STYLE: { HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  scroll: {
    paddingVertical: HEADER_HEIGHT,
  },
});
