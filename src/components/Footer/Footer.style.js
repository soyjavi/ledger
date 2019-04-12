import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, ENV, THEME } from '../../reactor/common';

const { COLOR, ELEVATION, SPACE } = THEME;
const { STYLE: { FOOTER_HEIGHT } } = C;

export default StyleSheet.create({
  buttonBack: {
    marginRight: SPACE.S,
  },

  buttonOption: {
    marginBottom: SPACE.S,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    bottom: 0,
    justifyContent: 'flex-end',
    height: FOOTER_HEIGHT,
    paddingHorizontal: SPACE.MEDIUM,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    width: '100%',
    zIndex: 2,
  },

  options: {
    ...ELEVATION.LARGE,
    backgroundColor: COLOR.WHITE,
    bottom: 0,
    left: 0,
    paddingTop: SPACE.MEDIUM,
    paddingHorizontal: SPACE.MEDIUM,
    paddingBottom: FOOTER_HEIGHT - SPACE.MEDIUM,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    right: 0,
  },

  title: {
    marginBottom: SPACE.MEDIUM,
  },
});
