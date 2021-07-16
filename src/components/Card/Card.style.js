import { Theme } from '@lookiero/aurora';
import StyleSheet from 'react-native-extended-stylesheet';

const { spaceM } = Theme.get();

const CARD_SIZE = spaceM * 10;

const style = StyleSheet.create({
  box: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    height: CARD_SIZE * 0.75,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    padding: '$spaceM',
    width: CARD_SIZE,
  },

  content: {
    flex: 1,
    // padding: '$spaceM',
    alignItems: 'flex-start',
  },

  breakline: {
    flex: 1,
  },
});

export { CARD_SIZE, style };
