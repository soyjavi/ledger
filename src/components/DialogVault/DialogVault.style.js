import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE } = C;
const {
  COLOR, UNIT, OFFSET, SPACE,
} = THEME;
const THUMBNAIL_SIZE = UNIT * 3.2;

export default StyleSheet.create({
  button: {
    flex: 1,
  },

  dialog: STYLE.DIALOG,

  frame: STYLE.DIALOG_FRAME,

  form: {
    marginVertical: OFFSET,
  },

  card: {
    ...STYLE.CARD,
    alignItems: 'center',
    backgroundColor: COLOR.BASE,
    width: 60,
    marginRight: SPACE.S,
  },

  cardSelected: {
    backgroundColor: COLOR.PRIMARY,
  },

  currencies: {
    marginBottom: SPACE.REGULAR,
    marginTop: SPACE.XS,
  },

  textHighlight: {
    color: COLOR.WHITE,
  },

  thumbnail: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: THUMBNAIL_SIZE / 2,
    height: THUMBNAIL_SIZE,
    marginBottom: SPACE.XXS,
    width: THUMBNAIL_SIZE,
  },
});
