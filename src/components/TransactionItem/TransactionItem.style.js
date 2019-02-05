import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  button: {
    marginTop: OFFSET,
    marginLeft: UNIT * 3.4,
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
    paddingTop: UNIT,
    paddingBottom: OFFSET,
    backgroundColor: COLOR.BASE,
  },

  heading: {
    marginTop: OFFSET,
  },

  icon: {
    height: UNIT * 2.2,
    marginRight: OFFSET,
    width: UNIT * 2.2,
  },

  iconExtended: {
    alignSelf: 'flex-start',
    height: UNIT * 1.4,
    margin: UNIT / 2,
    opacity: 0.5,
    width: UNIT * 1.4,
  },

  map: {
    backgroundColor: COLOR.BASE,
    height: UNIT * 9.6,
    width: '100%',
  },

  texts: {
    flex: 1,
  },
});
