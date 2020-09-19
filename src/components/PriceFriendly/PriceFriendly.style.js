import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE } = THEME;

export default StyleSheet.create({
  highlight: {
    backgroundColor: COLOR.BRAND_OPACITY,
    borderRadius: BORDER_RADIUS / 2,
    paddingHorizontal: SPACE.S,
    paddingVertical: SPACE.XS / 2,
    marginRight: -SPACE.S,
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
    marginHorizontal: SPACE.XS / 4,
  },
});
