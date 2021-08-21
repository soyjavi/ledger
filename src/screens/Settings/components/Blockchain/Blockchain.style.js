import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  container: {
    marginBottom: '$spaceL',
  },

  box: {
    backgroundColor: '$colorInfo',
    padding: '$spaceM',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: '$spaceXS',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  offset: {
    marginHorizontal: '$spaceM',
  },
});
