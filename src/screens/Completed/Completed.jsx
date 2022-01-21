import {
  // helpers
  ALIGN,
  SIZE,
  LAYOUT,
  // components
  SafeAreaView,
  View,
} from '@lookiero/aurora';
import { useRouter } from '@lookiero/router';
import React from 'react';

import { BANNERS } from '@assets';
import { L10N, ROUTE } from '@common';
import { Banner, Button, Viewport } from '@components';
import { useStore } from '@context';

import { style } from './Completed.style';

export const Completed = () => {
  const { go } = useRouter();
  const { updateSettings } = useStore();

  const handlePress = async () => {
    await updateSettings({ onboarded: true });

    go({ path: `${ROUTE.MAIN}${ROUTE.TAB_DASHBOARD}` });
  };

  return (
    <Viewport path={ROUTE.COMPLETED}>
      <SafeAreaView flex={SIZE.XS}>
        <View style={style.content} justifyContent={ALIGN.END} padding={SIZE.M}>
          <Banner
            align={ALIGN.END}
            image={BANNERS.COMPLETED}
            marginBottom={LAYOUT.XS}
            title={L10N.ONBOARDING_COMPLETED_TITLE}
            caption={L10N.ONBOARDING_COMPLETED_CAPTION}
          />
          <View alignSelf={ALIGN.END}>
            <Button onPress={handlePress}>{L10N.CONTINUE}</Button>
          </View>
        </View>
      </SafeAreaView>
    </Viewport>
  );
};
