import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const {
  COLOR, FONT, OFFSET, UNIT,
} = THEME;

const BULLET_SIZE = UNIT * 2;

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
    backgroundColor: COLOR.TEXT,
  },

  container: {
    alignSelf: 'center',
    height: '100%',
    paddingHorizontal: OFFSET,
    maxWidth: UNIT * 40,
    minWidth: UNIT * 32,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: OFFSET,
  },

  fingerprint: {
    alignSelf: 'center',
    width: BULLET_SIZE * 2,
    height: BULLET_SIZE * 2,
    marginBottom: UNIT * 2.4,
  },

  logo: {
    alignSelf: 'center',
    width: UNIT * 12.8,
    height: UNIT * 8,
    marginBottom: OFFSET / 2,
  },

  pin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: OFFSET * 2,
  },

  text: {
    alignSelf: 'center',
    maxWidth: '90%',
    textAlign: 'center',
  },

  textSlogan: FONT.HEADLINE,
});
