import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: '$borderRadius',
    justifyContent: 'center',
    minHeight: '$spaceXXL + $spaceXS',
    minWidth: '$spaceXXL + $spaceXS',
  },

  rounded: {
    borderRadius: '$spaceXXXL / 2',
  },
});
