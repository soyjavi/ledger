import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  container: {
    borderRadius: '$borderRadius',
    marginHorizontal: '$spaceS',
    marginBottom: '$spaceS',
  },

  content: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  icon: {
    fontSize: '$spaceXL',
    height: '$spaceXL',
    marginRight: '$spaceS',
    minWidth: '$spaceXL',
    width: '$spaceXL',
  },
});
