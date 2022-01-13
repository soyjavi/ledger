import { Platform } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet';

export const style = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginRight: '$spaceS',
  },

  container: {
    // flex: 1,
    marginHorizontal: '$spaceM',
    // display: 'block',
  },

  content: {
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '$colorInfo',
    borderColor: '$colorBase',
    borderRadius: '$borderRadius',
    borderWidth: '$borderSize',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '$spaceM',
    paddingRight: '$spaceS',
    width: '100%',
  },

  input: {
    fontFamily: '$fontInput',
    fontSize: '$fontBodySize3',
    color: '$colorContent',
    height: '$inputSize * 0.9',
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
