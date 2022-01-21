import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  $borderRadius: '$inputSize /2',

  container: {
    alignItems: 'center',
    backgroundColor: '$colorPrimary',
    borderRadius: '$borderRadius',
    flex: 2,
    height: '$inputSize',
    justifyContent: 'center',
    maxHeight: '$inputSize',
    minHeight: '$inputSize',
    overflow: 'hidden',
    paddingHorizontal: '$borderRadius',
    position: 'relative',
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
