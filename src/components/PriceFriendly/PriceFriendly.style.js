import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, FONT, SPACE } = THEME;

export default StyleSheet.create({
  highlight: {
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SPACE.S,
    paddingVertical: SPACE.XS / 2,
    marginRight: -SPACE.S / 2,
  },

  symbolHeadline: {
    fontSize: FONT.HEADLINE.fontSize * 0.75,
    marginHorizontal: SPACE.XS,
  },

  symbolSubtitle: {
    fontSize: FONT.SUBTITLE.fontSize * 0.75,
    marginHorizontal: SPACE.XS / 2,
  },

  symbolBody: {
    fontSize: FONT.BODY.fontSize * 0.75,
    marginHorizontal: SPACE.XS / 3,
  },

  symbolCaption: {
    fontSize: FONT.CAPTION.fontSize * 0.85,
    marginHorizontal: SPACE.XS / 4,
  },
});
