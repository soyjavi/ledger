import {
  // helpers
  ALIGN,
  COLOR,
  FLEX_DIRECTION,
  SIZE,
  // components
  Image,
  SafeAreaView,
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { LOGO } from '@assets';
import { C, L10N } from '@common';
import { Viewport } from '@components';
import { useStore } from '@context';

import { NumKeyboard } from './components';
import { onHandshake, askLocalAuthentication } from './Session.controller';
import { style } from './Session.style';

const { IS_DEV, VERSION } = C;

const Session = ({ onSession, visible, ...others }) => {
  const store = useStore();

  const [pin, setPin] = useState('');

  const handleHandshake = onHandshake.bind(undefined, { onSession, store });

  useEffect(() => {
    if (visible) {
      const { settings, vaults = [] } = store;

      if (settings.pin && vaults.length !== 0) {
        if (IS_DEV) setTimeout(() => setPin(settings.pin), 1000);
        else if (pin === '') askLocalAuthentication({ setPin, store });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (pin.length === 4) {
      const { settings } = store;
      if (settings.pin === undefined || settings.pin === pin) handleHandshake(pin);
      else setPin('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  const signup = store.authorization === undefined;

  return (
    <Viewport {...others} visible={visible}>
      <SafeAreaView flex={SIZE.XS}>
        <View alignItems={ALIGN.CENTER} style={style.content} justifyContent={ALIGN.END} padding={SIZE.M}>
          <Image style={style.image} resizeMode="cover" src={LOGO} />
          <Text color={COLOR.GRAYSCALE_L} detail level={1} marginTop={SIZE.XXL}>
            {signup ? L10N.PIN_CHOOSE : L10N.PIN}
          </Text>
          <View flexDirection={FLEX_DIRECTION.ROW} marginVertical={SIZE.L}>
            {['•', '•', '•', '•'].map((letter, index) => (
              <View
                key={index}
                backgroundColor={pin.length > index ? COLOR.PRIMARY : COLOR.GRAYSCALE_XL}
                style={style.bullet}
              />
            ))}
          </View>

          <NumKeyboard marginVertical={SIZE.M} onPress={(number) => setPin(`${pin}${number}`)} />
          <Text color={COLOR.GRAYSCALE_L} detail>{`v${VERSION}`}</Text>
        </View>
      </SafeAreaView>
    </Viewport>
  );
};

Session.propTypes = {
  signup: PropTypes.bool,
  visible: PropTypes.bool,
  onSession: PropTypes.func,
};

export { Session };
