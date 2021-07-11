import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  blur: {
    height: '100%',
    width: '100%',
  },

  header: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  title: {
    left: '$layoutL',
    position: 'absolute',
    right: '$layoutL',
    textAlign: 'center',
  },

  offline: {
    borderRadius: '$spaceXS',
    paddingHorizontal: '$spaceS',
    paddingVertical: '$spaceXS',
    position: 'absolute',
    right: '$spaceM',
  },
});
