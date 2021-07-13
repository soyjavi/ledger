import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  $barSize: 8,
  bar: {
    borderBottomRightRadius: '$borderRadius',
    borderTopRightRadius: '$borderRadius',
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
