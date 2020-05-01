import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { COLOR, UNIT, SPACE } = THEME;

const LOGO_SIZE = UNIT * 6.4;

export default StyleSheet.create({
  active: {
    color: COLOR.TEXT,
  },

  activity: {
    marginBottom: UNIT / 2,
  },

  container: {
    alignSelf: 'center',
    height: '100%',
    paddingHorizontal: SPACE.M,
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

  name: {
    color: COLOR.LIGHTEN,
    fontSize: UNIT * 5.6,
    zIndex: 1,
  },

  textCenter: {
    alignSelf: 'center',
  },
});
