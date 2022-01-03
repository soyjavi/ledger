import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  $barRadius: '$borderRadius',
  $barSize: '$borderRadius * 1.75',
  bar: {
    borderRadius: '$barRadius',
    height: '$barSize',
    marginTop: '$spaceXS',
    marginBottom: '$spaceS',
    minWidth: '$barSize',
  },

  barSmall: {
    height: '$barSize / 2',
    minWidth: '$barSize / 2',
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
