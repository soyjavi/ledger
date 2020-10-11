import { BackHandler, Platform } from 'react-native';

const IS_ANDROID = Platform.OS === 'android';

export const onHardwareBackPress = (subscribe = true, callback) => {
  if (IS_ANDROID) {
    const method = subscribe ? 'addEventListener' : 'removeEventListener';

    BackHandler[method]('hardwareBackPress', () => {
      if (subscribe) callback();
      return true;
    });
  }
};
