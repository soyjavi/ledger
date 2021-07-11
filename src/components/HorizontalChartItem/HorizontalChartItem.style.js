import StyleSheet from 'react-native-extended-stylesheet';

const BAR_SIZE = 8; // S

export const style = StyleSheet.create({
  bar: {
    borderRadius: '$borderRadius',
    height: BAR_SIZE,
    marginTop: '$spaceXS',
    marginBottom: '$spaceS',
    minWidth: BAR_SIZE,
  },

  barSmall: {
    height: BAR_SIZE / 2,
    minWidth: BAR_SIZE / 2,
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
