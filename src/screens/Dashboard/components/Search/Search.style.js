import { Platform } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  button: {
    alignSelf: 'center',
  },

  container: {
    flex: 1,
  },

  content: {
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '$colorInfo',
    borderRadius: '$borderRadius',
    borderWidth: '$borderSize',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '$spaceM',
    width: '100%',
  },

  input: {
    fontFamily: '$fontInput',
    fontSize: '$fontInputSize',
    borderColor: '$colorBase',
    color: '$colorContent',
    height: '$inputSize',
    flex: 1,
    marginRight: '$spaceM',
    ...Platform.select({
      web: {
        userSelect: 'none',
      },
    }),
  },

  focus: {
    borderColor: '$colorContent',
    backgroundColor: '$colorBase',
  },
});
