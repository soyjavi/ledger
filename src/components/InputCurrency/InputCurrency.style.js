import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  $optionSize: '$layoutXL - $spaceXS',
  $iconHeight: '$spaceS + $spaceXS',

  amounts: {
    alignItems: 'flex-end',
    flex: 1,
  },

  container: {
    alignItems: 'center',
    borderStyle: '$borderStyle',
    borderRadius: '$borderRadius',
    borderWidth: '$borderSize',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '$optionSize',
    marginBottom: '$spaceM',
    paddingBottom: '$fontInputPaddingBottom',
    paddingLeft: '$fontInputPaddingLeft',
    paddingRight: '$fontInputPaddingRight',
    paddingTop: '$fontInputPaddingTop',
  },

  icon: {
    lineHeight: '$iconHeight',
    maxHeight: '$iconHeight',
    minHeight: '$iconHeight',
  },

  input: {
    fontFamily: '$fontInput',
    fontSize: '$fontInputSize',
    height: '$optionSize',
    opacity: 0,
    paddingLeft: '$fontInputPaddingLeft',
    paddingRight: '$fontInputPaddingRight + $spaceM',
    position: 'absolute',
    right: 0,
    textAlign: 'right',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
});
