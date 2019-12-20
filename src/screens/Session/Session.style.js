import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT, SPACE } = THEME;

const BULLET_SIZE = UNIT * 2;
const LOGO_SIZE = UNIT * 6.4;

export default StyleSheet.create({
  activity: {
    marginBottom: UNIT / 2,
  },

  active: {
    backgroundColor: COLOR.TEXT_HIGHLIGHT,
  },

  bullet: {
    width: BULLET_SIZE,
    height: BULLET_SIZE,
    borderRadius: BULLET_SIZE / 2,
    margin: UNIT,
    backgroundColor: COLOR.BASE,
  },

  bulletActive: {
    backgroundColor: COLOR.ACCENT,
  },

  container: {
    alignSelf: 'center',
    height: '100%',
    paddingHorizontal: SPACE.REGULAR,
    maxWidth: UNIT * 40,
    minWidth: UNIT * 32,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginTop: SPACE.XS,
    marginRight: SPACE.XS,
  },

  pin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACE.REGULAR,
  },

  row: {
    ...LAYOUT.STYLE.ROW,
  },

  textName: {
    fontSize: LOGO_SIZE,
    zIndex: 1,
  },

  textVersion: {
    alignSelf: 'center',
  },
});
