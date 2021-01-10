import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, FONT, SPACE } = THEME;

export default StyleSheet.create({
  highlight: {
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SPACE.S,
    paddingVertical: SPACE.XS / 2,
    marginRight: -SPACE.S,
  },

  symbolHeadline: {
    fontSize: FONT.HEADLINE.fontSize * 0.8,
    marginHorizontal: SPACE.XS / 2,
  },

  symbolSubtitle: {
    fontSize: FONT.SUBTITLE.fontSize * 0.8,
    marginHorizontal: SPACE.XS / 3,
  },

  symbolBody: {
    fontSize: FONT.BODY.fontSize * 0.8,
    marginHorizontal: SPACE.XS / 3,
  },

  symbolCaption: {
    fontSize: FONT.CAPTION.fontSize * 0.9,
    marginHorizontal: SPACE.XS / 4,
  },
});
