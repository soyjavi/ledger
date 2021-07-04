import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  value: {
    fontFamily: 'font-bold',
  },

  highlight: {
    borderRadius: '$spaceXS',
    marginRight: `$spaceXS * -1`,
    paddingHorizontal: '$spaceXS',
    paddingVertical: '$spaceXXS',
  },

  symbol: {
    fontFamily: 'font-currency',
    transform: [{ scale: 0.75 }],
  },
});
