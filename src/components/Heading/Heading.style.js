import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  row: {
    alignItems: 'center', // TODO: Probably we should take care of inverted Headings
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '$spaceXS',
    marginHorizontal: '$spaceM',
  },

  children: {
    flexDirection: 'row',
  },
});
