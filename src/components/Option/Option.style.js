import { Theme } from '@lookiero/aurora';
import StyleSheet from 'react-native-extended-stylesheet';

const { spaceXS, layoutXL } = Theme.get();

const OPTION_SIZE = layoutXL - spaceXS;

const style = StyleSheet.create({
  container: {
    height: '$layoutXL',
    minHeight: '$layoutXL',
    minWidth: '$layoutXL',
    padding: '$spaceXS',
    width: '$layoutXL',
  },
});

export { OPTION_SIZE, style };
