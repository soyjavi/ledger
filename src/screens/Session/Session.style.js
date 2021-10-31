import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  bullet: {
    borderRadius: '$spaceM / 2',
    height: '$spaceM',
    marginHorizontal: '$spaceS',
    // marginVertical: SPACE.L,
    width: '$spaceM',
  },

  content: {
    height: '100%',
  },

  image: {
    width: '$layoutXL * 2',
    height: '$layoutXXL / 2',
  },
});
