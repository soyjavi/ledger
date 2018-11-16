import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;

const BULLET_SIZE = UNIT * 2;

export default StyleSheet.create({
  activity: {
    marginBottom: UNIT / 2,
  },

  container: {
    alignSelf: 'center',
    height: '100%',
    padding: OFFSET,
    maxWidth: UNIT * 40,
    minWidth: UNIT * 32,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: OFFSET,
  },

  text: {
    alignSelf: 'center',
    maxWidth: '90%',
    textAlign: 'center',
  },

  title: {
    marginBottom: UNIT,
  },

  pin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: OFFSET * 2,
  },

  bullet: {
    width: BULLET_SIZE,
    height: BULLET_SIZE,
    borderRadius: BULLET_SIZE / 2,
    margin: UNIT,
    backgroundColor: COLOR.BASE,
  },

  bulletActive: {
    backgroundColor: COLOR.PRIMARY,
  },

  active: {
    backgroundColor: COLOR.TEXT_HIGHLIGHT,
  },
});
