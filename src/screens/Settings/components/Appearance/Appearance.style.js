import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  active: {
    borderColor: '$colorContent',
  },

  container: {
    marginBottom: '$spaceL',
  },

  color: {
    borderColor: '$colorGrayscaleXL',
    borderRadius: '$spaceXXL / 2',
    borderStyle: '$borderStyle',
    borderWidth: '$spaceXS',
    height: '$spaceXXL',
    width: '$spaceXXL',
  },

  colors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '$spaceXS',
  },

  offset: {
    marginHorizontal: '$spaceM',
  },
});
