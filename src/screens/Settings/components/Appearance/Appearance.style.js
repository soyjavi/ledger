import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  card: {
    marginLeft: '$spaceS',
  },

  firstCard: {
    marginLeft: '$spaceM',
  },

  lastCard: {
    marginRight: '$spaceM',
  },

  container: {
    marginBottom: '$spaceL',
  },

  color: {
    borderColor: '$colorGrayscaleXL',
    borderRadius: '$iconSize / 2',
    height: '$iconSize',
    width: '$iconSize',
  },
});
