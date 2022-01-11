import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  $borderRadius: '$inputSize /2',

  container: {
    backgroundColor: '$colorPrimary',
    borderRadius: '$borderRadius',
    height: '$inputSize',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  secondary: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: '$colorContent',
    borderStyle: '$borderStyle',
    borderWidth: '$borderSize',
  },

  disabled: {
    backgroundColor: '$colorGrayscaleXL',
    borderWidth: 0,
  },
});
