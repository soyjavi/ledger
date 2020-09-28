import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { FONT, SPACE } = THEME;

export default StyleSheet.create({
  highlight: {
    paddingHorizontal: SPACE.S / 1.5,
    paddingVertical: SPACE.XS / 2,
    marginRight: -SPACE.S / 1.5,
  },

  symbolHeadline: {
    fontSize: FONT.HEADLINE.fontSize * 0.65,
    marginHorizontal: SPACE.XS / 2,
  },

  symbolSubtitle: {
    fontSize: FONT.SUBTITLE.fontSize * 0.7,
    marginHorizontal: SPACE.XS / 3,
  },

  symbolBody: {
    fontSize: FONT.BODY.fontSize * 0.85,
    marginHorizontal: SPACE.XS / 3,
  },

  symbolCaption: {
    fontSize: FONT.CAPTION.fontSize * 0.85,
    marginHorizontal: SPACE.XS / 4,
  },
});
