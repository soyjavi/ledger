import { Theme } from '@lookiero/aurora';
import StyleSheet from 'react-native-extended-stylesheet';

import { colorOpacity } from '@common';

export const style = StyleSheet.create({
  $barSize: 8,
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '$barSize * 8',
  },

  bar: {
    borderTopLeftRadius: '$borderRadius',
    borderTopRightRadius: '$borderRadius',
    maxHeight: '100%',
    minHeight: '$barSize',
    width: '$barSize',
    zIndex: 2,
  },

  border: {
    borderColor: '$colorGrayscaleXL',
    borderTopWidth: 1,
  },

  offset: {
    marginHorizontal: '$spaceM',
    zIndex: 1,
  },

  barInverted: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: '$borderRadius',
    borderBottomRightRadius: '$borderRadius',
  },

  captions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '$colorGrayscaleXL',
    borderTopWidth: 1,
    paddingTop: '$spaceXS',
    zIndex: 0,
  },

  caption: {
    fontSize: '$fontDetailSize3 * 0.8',
  },

  column: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  columnInverted: {
    justifyContent: 'flex-start',
  },

  headingInverted: {
    bottom: '$spaceM',
    position: 'absolute',
    right: 0,
  },

  scales: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },

  scaleAvg: {
    marginTop: '$spaceS * -1',
    top: '100%',
  },

  scaleLine: {
    height: 3,
    width: '100%',
    top: '50%',
  },

  tag: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: '$borderRadius',
    paddingHorizontal: '$spaceXS',
  },

  scaleBorder: {
    borderColor: () => colorOpacity(Theme.get('colorBase'), 0.5),
    borderWidth: '$borderSize',
  },
});
