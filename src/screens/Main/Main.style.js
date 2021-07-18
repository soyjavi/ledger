import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  // ? TODO: Research the way for get a <BlurView> with a fixed height
  // blur: {
  //   height: '100%',
  //   width: '100%',
  // },

  footer: {
    backgroundColor: '$colorOverlay',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
});
