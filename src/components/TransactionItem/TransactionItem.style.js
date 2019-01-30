import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { THUMBNAIL_SIZE } } = C;
const { COLOR, OFFSET, UNIT } = THEME;
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
    marginLeft: (THUMBNAIL_SIZE / 2) - (BULLET_SIZE / 2),
    marginRight: (BULLET_SIZE / 2),
  },

  bulletPrice: {
    marginLeft: OFFSET / 2,
  },

  button: {
    marginLeft: OFFSET,
    alignSelf: 'flex-start',
  },

  row: LAYOUT.STYLE.ROW,

  container: {
    paddingHorizontal: OFFSET,
  },

  content: {
    paddingVertical: OFFSET / 2,
  },

  extended: {
    paddingVertical: OFFSET / 4,
  },

  extendedBottom: {
    paddingBottom: OFFSET,
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

  line: {
    position: 'absolute',
    left: OFFSET + (THUMBNAIL_SIZE / 2) - (LINE_SIZE / 2),
    width: LINE_SIZE,
    height: '100%',
    backgroundColor: COLOR.BASE,
    opacity: 0.5,
    zIndex: -1,
  },

  lineBottom: {
    top: 0,
    height: '50%',
  },

  lineBottomExtended: {
    bottom: OFFSET + (OFFSET / 4),
  },

  lineHeading: {
    height: '50%',
    bottom: 0,
  },
});
