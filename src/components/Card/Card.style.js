import { Theme } from '@lookiero/aurora';
import StyleSheet from 'react-native-extended-stylesheet';

const { spaceM, spaceS } = Theme.get();

const CARD_SIZE = spaceM * 10 + spaceS;

const style = StyleSheet.create({
  box: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    height: CARD_SIZE * 1.2,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    padding: '$spaceM',
    width: CARD_SIZE,
  },

  outlined: {
    borderColor: '$colorGrayscaleXL',
    borderStyle: '$borderStyle',
    borderRadius: '$borderRadius',
    borderWidth: '$borderSize',
  },

  content: {
    alignItems: 'flex-start',
    flex: 1,
  },

  currency: {
    fontFamily: 'font-currency',
  },

  spacer: {
    flex: 1,
  },
});

export { CARD_SIZE, style };
