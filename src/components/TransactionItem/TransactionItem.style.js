import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;
const BULLET_SIZE = UNIT * 1.2;
const LINE_SIZE = UNIT * 0.2;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    paddingHorizontal: OFFSET,
    paddingVertical: OFFSET / 2,
  },

  heading: {
    marginTop: OFFSET,
  },

  texts: {
    flex: 1,
    marginLeft: OFFSET,
    marginRight: OFFSET / 2,
  },

  bullet: {
    width: BULLET_SIZE,
    height: BULLET_SIZE,
    borderRadius: BULLET_SIZE / 2,
    backgroundColor: COLOR.BASE,
    borderColor: COLOR.BACKGROUND,
    borderWidth: UNIT * 0.1,
  },

  line: {
    position: 'absolute',
    left: OFFSET + (BULLET_SIZE / 2) - (LINE_SIZE / 2),
    width: LINE_SIZE,
    height: '100%',
    backgroundColor: COLOR.BASE,
    opacity: 0.25,
  },

  lineBottom: {
    top: 0,
    height: '50%',
  },

  lineHeading: {
    height: '50%',
    bottom: 0,
  },
});
