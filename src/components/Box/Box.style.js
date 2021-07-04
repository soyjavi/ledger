import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  container: {
    height: '$layoutM',
    width: '$layoutM',
    borderWidth: '$borderSize',
    borderStyle: '$borderStyle',
  },

  date: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
