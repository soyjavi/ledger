import { Platform, StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    paddingVertical: SPACE.XXL * (Platform.OS === 'web' ? 1 : 2),
  },
});
