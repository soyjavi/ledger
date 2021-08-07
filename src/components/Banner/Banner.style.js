import { Dimensions } from 'react-native';
import StyleSheet from 'react-native-extended-stylesheet';

const { width } = Dimensions.get('window');

export const style = StyleSheet.create({
  content: {
    maxWidth: width * 0.8,
    width: width * 0.8,
  },
});
