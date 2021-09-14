import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  // ? TODO: Research the way for get a <BlurView> with a fixed height
  // blur: {
  //   height: '100%',
  //   width: '100%',
  // },

  header: {
    backgroundColor: '$colorOverlay',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  $iconSizeOffline: '$iconSize * 0.75',

  icon: {
    fontSize: '$iconSizeOffline',
    height: '$iconSizeOffline',
    marginRight: '$spaceS',
    minHeight: '$iconSizeOffline',
    minWidth: '$iconSizeOffline',
    width: '$iconSizeOffline',
  },

  title: {
    left: '$layoutL',
    position: 'absolute',
    right: '$layoutL',
  },

  offline: {
    alignItems: 'center',
    borderRadius: '$spaceXS',
    flexDirection: 'row',
    paddingHorizontal: '$spaceS',
    paddingVertical: '$spaceXS',
    position: 'absolute',
    right: '$spaceM',
  },
});
