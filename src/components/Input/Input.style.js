import { Platform } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  container: {
    borderStyle: '$borderStyle',
    borderRadius: '$borderRadius',
    borderWidth: '$borderSize',
    marginBottom: '$spaceM',
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
