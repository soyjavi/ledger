import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  offset: {
    paddingHorizontal: '$spaceM',
  },

  content: {
    flex: 1,
  },

  touchable: {
    paddingVertical: '$spaceS',
    width: '100%',
  },

  icon: {
    flex: 0,
    marginRight: '$spaceS',
  },

  text: {
    flex: 1,
  },
});
