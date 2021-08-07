import { Theme } from '@lookiero/aurora';
import { Dimensions } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet';

const { height, width } = Dimensions.get('window');
const { spaceM } = Theme.get();

const MAP_HEIGHT = Math.floor(height / 3);
const MAP_SMALL_HEIGHT = MAP_HEIGHT / 2;
const MAP_WIDTH = Math.floor(width - spaceM * 2);

const style = StyleSheet.create({
  image: {
    backgroundColor: '$colorGrayscaleXL',
    borderRadius: '$borderRadius',
    height: MAP_HEIGHT,
    overflow: 'hidden',
    width: '100%',
  },

  text: {
    flex: 1,
  },

  colorCaption: {
    color: '$colorGrayscaleL',
  },

  icon: {
    marginRight: '$spaceXS',
    fontSize: '$spaceM',
    height: '$spaceM',
    width: '$spaceM',
    minHeight: '$spaceM',
    minWidth: '$spaceM',
  },

  caption: {
    alignContent: 'center',
    flexDirection: 'row',
    marginTop: '$spaceXS',
  },

  small: {
    height: MAP_SMALL_HEIGHT,
  },
});

export { MAP_HEIGHT, MAP_SMALL_HEIGHT, MAP_WIDTH, style };
