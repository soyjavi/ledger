import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { BORDER_RADIUS, COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BASE,
    bottom: SPACE.S,
    borderRadius: BORDER_RADIUS,
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
