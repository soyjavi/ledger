import { Platform } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  $optionSize: '$layoutXL - $spaceXS',
  container: {
    height: '$optionSize',
    borderStyle: '$borderStyle',
    borderRadius: '$borderRadius',
    borderWidth: '$borderSize',
    marginBottom: '$spaceM',
  },

  input: {
    color: '$colorContent',
    flex: 0,
    fontFamily: '$fontInput',
    fontSize: '$fontInputSize',
    height: '$inputSize',
    margin: 0,
    minHeight: '$optionSize',
    paddingTop: '$fontInputPaddingTop + $spaceXS',
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
    top: '$spaceM - $spaceXS',
    left: '$fontInputPaddingLeft',
  },
});
