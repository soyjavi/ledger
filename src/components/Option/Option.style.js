import { Theme } from '@lookiero/aurora';
import StyleSheet from 'react-native-extended-stylesheet';

const { spaceXS, layoutXL } = Theme.get();

const OPTION_SIZE = layoutXL - spaceXS;

const style = StyleSheet.create({
  $optionSize: '$layoutXL - $spaceXS',
  container: {
    height: '$optionSize',
    minHeight: '$optionSize',
    minWidth: '$optionSize',
    padding: '$spaceXS',
    width: '$optionSize',
  },
});

export { OPTION_SIZE, style };
