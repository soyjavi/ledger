import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  box: {
    marginRight: '$spaceS',
  },

  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: '$spaceM',
    paddingVertical: '$spaceS',
    width: '100%',
  },

  currency: {
    fontFamily: 'font-currency',
  },

  outlined: {
    borderColor: '$colorGrayscaleXL',
    borderStyle: '$borderStyle',
    borderRadius: '$borderRadius',
    borderWidth: '$borderSize',
  },
});
