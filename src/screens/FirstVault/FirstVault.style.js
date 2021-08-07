import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  offset: {
    padding: '$spaceM',
  },
});
