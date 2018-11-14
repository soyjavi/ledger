import { StyleSheet } from 'react-native';

import { C } from '../../common';

const { STYLE: { DASHBOARD_HEIGHT, HEADER_HEIGHT } } = C;

export default StyleSheet.create({
  scroll: {
    paddingTop: DASHBOARD_HEIGHT,
    paddingBottom: HEADER_HEIGHT,
  },
});
