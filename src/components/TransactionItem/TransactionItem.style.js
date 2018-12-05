import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const {
  COLOR, FONT, OFFSET, UNIT,
} = THEME;
const BULLET_SIZE = UNIT * 1.2;
const LINE_SIZE = UNIT * 0.2;

export default StyleSheet.create({
  bullet: {
    width: BULLET_SIZE,
    height: BULLET_SIZE,
    borderRadius: BULLET_SIZE / 2,
    backgroundColor: COLOR.BASE,
    borderColor: COLOR.BACKGROUND,
    borderWidth: UNIT * 0.1,
  },

  bulletPrice: {
    marginLeft: OFFSET / 2,
  },

  button: {
    alignSelf: 'flex-start',
  },

  row: LAYOUT.STYLE.ROW,

  container: {
    paddingHorizontal: OFFSET,
    paddingVertical: OFFSET / 2,
  },

  extended: {
    paddingVertical: OFFSET / 4,
  },

  heading: {
    marginTop: OFFSET,
  },

  icon: {
    height: OFFSET,
    marginRight: UNIT / 4,
    opacity: 0.5,
    width: OFFSET,
  },

  map: {
    backgroundColor: COLOR.BASE,
    height: UNIT * 9.6,
    width: '100%',
  },

  texts: {
    flex: 1,
    marginLeft: OFFSET,
    marginRight: OFFSET / 2,
  },

  bold: {
    fontWeight: FONT.WEIGHT.BOLD,
  },

  line: {
    position: 'absolute',
    left: OFFSET + (BULLET_SIZE / 2) - (LINE_SIZE / 2),
    width: LINE_SIZE,
    height: '100%',
    backgroundColor: COLOR.BASE,
    opacity: 0.5,
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
