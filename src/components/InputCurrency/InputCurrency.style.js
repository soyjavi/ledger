import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  container: {
    borderStyle: '$borderStyle',
    borderWidth: '$borderSize',
    paddingTop: '$spaceM',
    marginBottom: '$spaceM',
  },

  content: {
    minHeight: '$inputSize',
    paddingTop: '$fontInputPaddingTop',
    paddingRight: '$fontInputPaddingRight',
    paddingBottom: '$fontInputPaddingBottom',
    paddingLeft: '$fontInputPaddingLeft',
  },

  input: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: '100%',
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
