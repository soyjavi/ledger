import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  $borderRadius: '$inputSize /2',

  container: {
    backgroundColor: 'red',
    borderRadius: '$borderRadius',
    height: '$inputSize',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
});
