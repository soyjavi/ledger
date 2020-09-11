import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

const ENV = useEnvironment();
const { COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.CTA,
    bottom: SPACE.S,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACE.XS,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    left: SPACE.S,
    right: SPACE.S,
    width: 'auto',
    zIndex: 1,
  },
});
