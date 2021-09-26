import {
  // helpers
  ALIGN,
  COLOR,
  FLEX_DIRECTION,
  SIZE,
  // components
  SafeAreaView,
  Text,
  View,
} from '@lookiero/aurora';
import { useRouter } from '@lookiero/router';
import React, { useEffect, useMemo, useState } from 'react';
import { Image } from 'react-native';

import { LOGO } from '@assets';
import { C, L10N, ROUTE } from '@common';
import { Viewport } from '@components';
import { useStore } from '@context';
import { ServiceNode } from '@services';

import { NumKeyboard } from './components';
import { style } from './Session.style';

const { VERSION } = C;

export const Session = () => {
  const {
    settings,
    updateSettings,
    vaults: [, ...vaults],
  } = useStore();
  const { go, route } = useRouter();

  const [pin, setPin] = useState('');

  const is = {
    visible: route.path === ROUTE.SESSION,
    signup: settings.authorization === undefined,
  };

  useEffect(() => {
    if (!is.visible || pin.length !== 4) return;

    if (settings.pin === undefined || settings.pin === pin) handleSubmit();
    else setPin('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  const handleSubmit = async () => {
    if (is.signup) {
      const authorization = await ServiceNode.signup({ fingerprint: settings.fingerprint });
      await updateSettings({ pin, authorization });
    }

    go({ path: vaults.length === 0 ? ROUTE.FIRST_VAULT : `${ROUTE.MAIN}${ROUTE.TAB_DASHBOARD}` });
  };

  return useMemo(
    () => (
      <Viewport path={ROUTE.SESSION}>
        <SafeAreaView flex={SIZE.XS}>
          <View alignItems={ALIGN.CENTER} style={style.content} justifyContent={ALIGN.END} padding={SIZE.M}>
            <Image resizeMode="cover" source={LOGO} style={style.image} />
            <Text color={COLOR.GRAYSCALE_L} detail level={1} marginTop={SIZE.XXL}>
              {is.signup ? L10N.PIN_CHOOSE : L10N.PIN}
            </Text>
            <View flexDirection={FLEX_DIRECTION.ROW} marginVertical={SIZE.L}>
              {['•', '•', '•', '•'].map((letter, index) => (
                <View
                  key={index}
                  backgroundColor={pin.length > index ? COLOR.CONTENT : COLOR.GRAYSCALE_XL}
                  style={style.bullet}
                />
              ))}
            </View>

            <NumKeyboard marginVertical={SIZE.M} onPress={(number) => setPin(`${pin}${number}`)} />
            <Text color={COLOR.GRAYSCALE_L} detail>{`v${VERSION}`}</Text>
          </View>
        </SafeAreaView>
      </Viewport>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pin],
  );
};
