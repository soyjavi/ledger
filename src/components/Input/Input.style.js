import StyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

export const style = StyleSheet.create({
  container: {
    borderStyle: '$borderStyle',
    borderWidth: '$borderSize',
    paddingTop: '$spaceM',
  },

  input: {
    color: '$colorContent',
    flex: 0,
    fontFamily: '$fontInput',
    fontSize: '$fontInputSize',
    height: '$inputSize',
    margin: 0,
    minHeight: '$inputSize',
    paddingTop: '$fontInputPaddingTop',
    paddingRight: '$fontInputPaddingRight',
    paddingBottom: '$fontInputPaddingBottom',
    paddingLeft: '$fontInputPaddingLeft',
    textAlignVertical: 'center',
    ...Platform.select({
      web: {
        outlineWidth: 0,
      },
    }),
    width: '100%',
  },

  label: {
    position: 'absolute',
    top: '$spaceM',
    left: '$spaceM',
  },
});
