import StyleSheet from 'react-native-extended-stylesheet';

const BAR_SIZE = 8; // S

export const style = StyleSheet.create({
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: BAR_SIZE * 8,
  },

  bar: {
    borderTopLeftRadius: '$borderRadius',
    borderTopRightRadius: '$borderRadius',
    maxHeight: '100%',
    minHeight: BAR_SIZE,
    width: BAR_SIZE,
    zIndex: 2,
  },

  border: {
    borderColor: '$colorGrayscaleXL',
    borderTopWidth: 1,
  },

  content: {
    marginHorizontal: '$spaceM',
  },

  barInverted: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: '$borderRadius',
    borderBottomRightRadius: '$borderRadius',
    zIndex: 2,
  },

  captions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '$colorGrayscaleXL',
    borderTopWidth: 1,
    paddingTop: '$spaceXS',
  },

  caption: {
    // transform: [{ scale: 0.7 }],
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

  scales: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },

  scaleAvg: {
    marginTop: '$spaceS * -1',
    top: '100%',
  },

  scaleLine: {
    height: 1,
    opacity: 0.25,
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
    borderWidth: 1,
    borderColor: '$colorBase',
  },
});
